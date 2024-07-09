import express, { Request, Response } from "express";
import cors from "cors";
import mysql from "mysql2/promise"; // 비동기 처리를 위해 mysql2의 promise API 사용
import { QueryError, RowDataPacket } from "mysql2";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

// MySQL 연결 설정
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "meal_kit_store",
  timezone: "Z",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 쿼리 실행 함수
const executeQuery = async (query: string, params: any[], res: Response) => {
  try {
    const [results] = await connection.execute(query, params);
    res.json(results);
  } catch (err) {
    console.error("쿼리 실행 중 오류 발생:", err);
    res.status(500).json({ error: "내부 서버 오류" });
  }
};

// mapPage에 정보 불러오기
app.get("/search", (req: Request, res: Response) => {
  const { query } = req.query;
  const searchQuery = `
    SELECT s.storeId, s.name AS storeName, s.address, s.latitude, s.longitude, m.menuName AS menuName 
    FROM stores s 
    LEFT JOIN menus m ON s.storeId = m.storeId
    WHERE s.name LIKE ? OR s.address LIKE ? OR m.menuName LIKE ?
  `;
  executeQuery(searchQuery, [`%${query}%`, `%${query}%`, `%${query}%`], res);
});

// 지원님 서버
app.get("/api/infoPage/:storeId", async (req: Request, res: Response) => {
  const { storeId } = req.params;
  const query = `
     SELECT 
      stores.name, 
      stores.rating, 
      stores.address, 
      stores.phone,
      storeImages.imageUrl 
    FROM stores
    LEFT JOIN storeImages ON stores.storeId = storeImages.storeId
    WHERE stores.storeId = ?;
  `;
  //executeQuery(query, [storeId], res);
  // try {
  //   const [result] = await connection.execute<RowDataPacket[]>(query, [
  //     storeId,
  //   ]);
  //   res.json(result[0]);
  // } catch (err) {
  //   console.error("상점 정보 조회 중 오류 발생:", err);
  //   res.status(500).json({ error: "내부 서버 오류" });
  // }

  try {
    const [result] = await connection.execute<RowDataPacket[]>(query, [
      storeId,
    ]);
    if (Array.isArray(result) && result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ error: "상점 정보 없음" });
    }
  } catch (err) {
    handleError(err, res);
  }
});

app.get("/api/infoMenu/:storeId", (req: Request, res: Response) => {
  const { storeId } = req.params;
  const query = `
      SELECT 
        menus.menuName as kitName, 
        GROUP_CONCAT(menuIngredients.ingredient SEPARATOR ', ') AS kitIngredient, 
        inventory.quantity as kitCount
      FROM menus
      LEFT JOIN menuIngredients ON menus.menuId = menuIngredients.menuId
      LEFT JOIN inventory ON menus.menuId = inventory.menuId
      LEFT JOIN storeMenus ON menus.menuId = storeMenus.menuId
      WHERE storeMenus.storeId = ?
      GROUP BY menus.menuName, inventory.quantity;
  `;
  executeQuery(query, [storeId], res);
});

app.get("/api/infoTime/:storeId", (req: Request, res: Response) => {
  const { storeId } = req.params;
  const query = `
    SELECT
      storeDayOfWeek,
      openTime,
      closeTime,
      isClosed
    FROM storeHours
    WHERE storeId = ?;
  `;
  executeQuery(query, [storeId], res);
});

//찜 상태 조회
app.get("/api/favorites/:userId/:storeId", (req: Request, res: Response) => {
  const { userId, storeId } = req.params;
  const query = `
    SELECT isFavorite
    FROM favorites
    WHERE storeId = ? AND userId = ?;
  `;
  executeQuery(query, [storeId, userId], res); // 매개변수 순서 확인
});

//찜 상태 업데이트
app.post("/api/favorites", (req: Request, res: Response) => {
  const { userId, storeId, isFavorite } = req.body;
  const query = `
    INSERT INTO favorites (userId, storeId, isFavorite)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE isFavorite = VALUES(isFavorite);
  `;
  connection
    .execute(query, [userId, storeId, isFavorite])
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.error("찜 목록 업데이트 중 오류 발생:", err);
      res.status(500).json({ error: "내부 서버 오류" });
    });
});

// 민석님 서버

// 특정 가게의 모든 밀키트 재고 조회
app.get("/api/inventory/:storeId", async (req: Request, res: Response) => {
  const { storeId } = req.params;
  if (isNaN(Number(storeId))) {
    return res.status(400).json({ error: "Invalid storeId" });
  }
  try {
    const query = `
      SELECT si.storeId, s.storeName, m.mealKitId, m.mealKitName, m.description, m.price, m.imageUrl, si.quantity
      FROM StoreInventory si
      JOIN Stores s ON si.storeId = s.storeId
      JOIN MealKits m ON si.mealKitId = m.mealKitId
      WHERE si.storeId = ?
    `;
    const [rows] = await connection.execute(query, [storeId]);
    res.json(rows);
  } catch (err) {
    handleError(err, res);
  }
});

// 특정 가게의 특정 밀키트 재고 수량 업데이트
app.put(
  "/api/inventory/:storeId/:mealKitId",
  async (req: Request, res: Response) => {
    const { storeId, mealKitId } = req.params;
    const { quantity } = req.body;

    if (isNaN(Number(storeId)) || isNaN(Number(mealKitId))) {
      return res.status(400).json({ error: "Invalid storeId or mealKitId" });
    }

    if (typeof quantity !== "number" || quantity < 0) {
      return res.status(400).json({ error: "Invalid quantity value" });
    }

    try {
      const updateQuery =
        "UPDATE StoreInventory SET quantity = ? WHERE storeId = ? AND mealKitId = ?";
      await connection.execute(updateQuery, [quantity, storeId, mealKitId]);

      const selectQuery = `
      SELECT si.storeId, s.storeName, m.mealKitId, m.mealKitName, m.description, m.price, m.imageUrl, si.quantity
      FROM StoreInventory si
      JOIN Stores s ON si.storeId = s.storeId
      JOIN MealKits m ON si.mealKitId = m.mealKitId
      WHERE si.storeId = ? AND si.mealKitId = ?
    `;
      const [updatedRows] = await connection.execute(selectQuery, [
        storeId,
        mealKitId,
      ]);

      if (Array.isArray(updatedRows) && updatedRows.length > 0) {
        res.json(updatedRows[0]);
      } else {
        res.status(404).json({ error: "Inventory item not found" });
      }
    } catch (err) {
      handleError(err, res);
    }
  }
);

// 모든 가게 정보 조회
app.get("/api/stores", async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM Stores");
    res.json(rows);
  } catch (err) {
    handleError(err, res);
  }
});

// 모든 사용자 정보 조회
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.execute(`
      SELECT 
        userNO, 
        userName,  
        userID, 
        email, 
        address 
      FROM users
    `);
    console.log("Users data:", rows); // 디버깅을 위한 로그
    res.json(rows);
  } catch (err) {
    handleError(err, res);
  }
});

// 사용자 삭제
app.delete("/api/users/:userNO", async (req: Request, res: Response) => {
  const { userNO } = req.params;
  if (isNaN(Number(userNO))) {
    return res.status(400).json({ error: "Invalid userNO" });
  }
  try {
    const [result] = await connection.execute(
      "DELETE FROM users WHERE userNO = ?",
      [userNO]
    );
    if ((result as any).affectedRows > 0) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    handleError(err, res);
  }
});

// 밀키트 등록 라우트를 올바르게 위치시킵니다.
app.post("/api/mealkit", async (req: Request, res: Response) => {
  try {
    const { storeId, mealKitName, description, price, imageUrl, quantity } =
      req.body;

    // 데이터베이스에 새 밀키트 추가
    const insertMealKitQuery = `
      INSERT INTO MealKits (mealKitName, description, price, imageUrl)
      VALUES (?, ?, ?, ?)
    `;
    const [mealKitResult] = await connection.execute(insertMealKitQuery, [
      mealKitName,
      description,
      price,
      imageUrl,
    ]);
    const mealKitId = (mealKitResult as any).insertId;

    // 가게 재고에 추가
    const insertInventoryQuery = `
      INSERT INTO StoreInventory (storeId, mealKitId, quantity)
      VALUES (?, ?, ?)
    `;
    await connection.execute(insertInventoryQuery, [
      storeId,
      mealKitId,
      quantity,
    ]);

    res.status(201).json({ message: "밀키트가 성공적으로 등록되었습니다." });
  } catch (error) {
    console.error("Error registering mealkit:", error);
    handleError(error, res);
  }
});

// 공통 에러 처리 함수
const handleError = (error: any, res: Response) => {
  console.error(error);
  res.status(500).json({ error: "내부 서버 오류" });
};

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
