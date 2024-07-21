import express, { Request, Response } from "express";
import cors from "cors";
import mysql from "mysql2/promise"; // 비동기 처리를 위해 mysql2의 promise API 사용
import { QueryError, ResultSetHeader, RowDataPacket } from "mysql2";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

// MySQL 연결 설정
const connection = mysql.createPool({
  host: "koreamorning.mysql.database.azure.com",
  user: "lovelove4695",
  password: "dydgus12!@",
  database: "mealkit",
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
    console.log("results:", results);
  } catch (err) {
    console.error("쿼리 실행 중 오류 발생:", err);
    res.status(500).json({ error: "내부 서버 오류" });
  }
};

// 로그인 회원가입
app.post("/api/signup", async (req: Request, res: Response) => {
  const { name, id, pwd, email, phoneNumber, address } = req.body;

  try {
    console.log("Received signup request:", {
      name,
      id,
      email,
      phoneNumber,
      address,
    });

    // 아이디 중복 체크
    const [rows] = await connection.execute(
      "SELECT COUNT(*) as count FROM member WHERE member_id = ?", //아이디인데 username으로 되어있어서 임의로 user_id로 변경함. 문제 발생시 죄송합니다
      [id]
    );
    const count = (rows as any)[0].count;
    if (count > 0) {
      console.log("Username already exists");
      return res.status(400).json({ error: "아이디가 이미 존재합니다." });
    }

    // 유저 등록
    await connection.execute(
      "INSERT INTO member (member_name, member_id, member_pwd, member_email, member_phone, member_address) VALUES (?, ?, ?, ?, ?, ?)",
      [name, id, pwd, email, phoneNumber, address]
    );

    console.log("User registered successfully");
    res.status(201).json({ message: "회원가입 성공" });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ error: "내부 서버 오류" });
  }
});

//로그인
app.post("/api/login", async (req: Request, res: Response) => {
  const { id, pwd } = req.body;

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM member WHERE member_id = ? AND member_pwd = ?",
      [id, pwd]
    );

    if ((rows as any).length > 0) {
      res.status(200).json({ message: "로그인 성공" });
    } else {
      res.status(401).json({ error: "아이디 또는 비밀번호가 잘못되었습니다." });
    }
  } catch (err) {
    console.error("로그인 중 오류 발생:", err);
    res.status(500).json({ error: "내부 서버 오류" });
  }
});

// mapPage에 정보 불러오기 -- 추후 수정
/*
app.get("/search", async (req: Request, res: Response) => {
  const { query } = req.query;

  if (!query) {
    return res.json([]);
  }

  const searchQuery = `
      SELECT 
      s.store_id,
      s.store_name ,
      s.store_address,
      s.store_latitude,
      s.store_longitude,
      s.store_rating,
      COALESCE(GROUP_CONCAT(DISTINCT m.menu_name ORDER BY m.menu_name SEPARATOR ', '), '') ,
      COALESCE(r.reviewCount, 0) AS reviewCount
    FROM 
      stores s 
    LEFT JOIN 
      menus m ON s.store_id = m.store_id
    LEFT JOIN 
      (SELECT store_id, COUNT(*) AS reviewCount FROM reviews GROUP BY store_id) r ON s.store_id = r.store_id
    WHERE 
      s.store_name LIKE ? 
      OR s.store_address LIKE ? 
      OR m.menu_name LIKE ?
    GROUP BY 
      s.store_id, s.store_name, s.store_address, s.store_latitude, s.store_longitude, s.store_rating, r.reviewCount
  `;

  try {
    const results = await executeQuery(searchQuery, [
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
    ]);
    res.json(results);
  } catch (err) {
    handleError(err, res);
  }
});
*/

// 지원님 서버

// 상세페이지 - 상점 정보 가져오기
app.get("/api/info_page/:store_id", async (req: Request, res: Response) => {
  const { store_id } = req.params;
  const query = `
     SELECT 
      s.store_name, 
      s.store_rating, 
      s.store_address, 
      s.store_phone,
      store_images.image_url 
    FROM stores s
    LEFT JOIN store_images ON s.store_id = store_images.store_id
    WHERE s.store_id = ?;
  `;

  try {
    const [result] = await connection.execute<RowDataPacket[]>(query, [
      store_id,
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

//상세 페이지 - 메뉴 데이터 불러오기
app.get("/api/info_menu/:store_id", (req: Request, res: Response) => {
  const { store_id } = req.params;
  const query = `
    SELECT 
      m.menu_name AS kitName, 
      m.menu_image_url AS imageUrl,
      m.menu_cooking_time AS cookingTime,
      m.menu_difficulty AS difficulty,
      m.menu_calories AS calories,
      m.menu_description AS description,
      COALESCE(GROUP_CONCAT(DISTINCT menu_ingredients.ingredient SEPARATOR ', '), '') AS kitIngredient, 
      inventory.quantity AS kitCount,
      COALESCE(GROUP_CONCAT(DISTINCT allergies.ingredient_name SEPARATOR ', '), '') AS kitAllergies
    FROM menus m
    LEFT JOIN menu_ingredients ON m.menu_id = menu_ingredients.menu_id
    LEFT JOIN inventory ON m.menu_id = inventory.menu_id
    LEFT JOIN store_menus ON m.menu_id = store_menus.menu_id
    LEFT JOIN menu_allergies ON m.menu_id = menu_allergies.menu_id
    LEFT JOIN allergies ON menu_allergies.allergy_id = allergies.allergy_id
    WHERE store_menus.store_id = ?
    GROUP BY m.menu_name, m.menu_image_url, m.menu_description, m.menu_cooking_time, m.menu_difficulty, m.menu_calories, inventory.quantity;
  `;

  executeQuery(query, [store_id], res);
});

//상세페이지 - 상점 운영시간 데이터 가져오기
app.get("/api/info_time/:store_id", (req: Request, res: Response) => {
  const { store_id } = req.params;
  const query = `
    SELECT
      CASE store_day_of_week
        WHEN 'Monday' THEN 1
        WHEN 'Tuesday' THEN 2
        WHEN 'Wednesday' THEN 3
        WHEN 'Thursday' THEN 4
        WHEN 'Friday' THEN 5
        WHEN 'Saturday' THEN 6
        WHEN 'Sunday' THEN 7
      END AS storeDayOfWeek,
      open_time AS openTime,
      close_time AS closeTime,
      is_closed AS isClosed
    FROM store_hours
    WHERE store_id = ?;
  `;
  executeQuery(query, [store_id], res);
});

//상세 페이지 - 찜 상태 조회
app.get(
  "/api/favorites/:store_id/:member_idx",
  (req: Request, res: Response) => {
    const { member_idx, store_id } = req.params;
    const query = `
    SELECT is_favorite 
    FROM favorites
    WHERE store_id = ? AND member_idx = ?;
  `;
    executeQuery(query, [store_id, member_idx], res); // 매개변수 순서 확인
  }
);

//상세 페이지 - 찜 상태 업데이트
app.post("/api/favorites", async (req: Request, res: Response) => {
  const { member_idx, store_id, is_favorite } = req.body;
  if (member_idx === null) {
    return res.status(400).json({ error: "member_idx 값이 필요합니다." });
  }

  try {
    if (is_favorite) {
      // is_favorite가 true일 때 데이터 삽입 또는 업데이트
      const query = `
        INSERT INTO favorites (member_idx, store_id, is_favorite)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE is_favorite = VALUES(is_favorite);
      `;
      await connection.execute(query, [member_idx, store_id, true]);
    } else {
      // is_favorite가 false일 때 데이터 삭제
      const query = `
        DELETE FROM favorites WHERE member_idx = ? AND store_id = ?;
      `;
      await connection.execute(query, [member_idx, store_id]);
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("찜 상태 업데이트 중 오류 발생:", error);
    res.status(500).json({ error: "내부 서버 오류" });
  }
});

//상세 페이지 - 리뷰 데이터 가져오기
app.get(
  "/api/info_review/:store_id/:member_idx?",
  async (req: Request, res: Response) => {
    const { member_idx, store_id } = req.params;
    let query;
    let params;

    query = `
      SELECT 
        reviews.review_id,
        reviews.store_id,
        reviews.member_idx,
        reviews.review_rating,
        reviews.comment,
        reviews.review_date AS reviewDate,
        member.member_name AS userName
      FROM reviews
      JOIN member ON reviews.member_idx = member.member_idx
      WHERE reviews.store_id = ?;
    `;
    params = [store_id];

    //날짜 포맷 변환
    try {
      const [rows] = await connection.execute(query, params);
      const formattedRows = (rows as any[]).map((row) => {
        if (row.reviewDate) {
          const date = new Date(row.reviewDate);
          const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}.${date
            .getDate()
            .toString()
            .padStart(2, "0")} ${date
            .getHours()
            .toString()
            .padStart(2, "0")}:${date
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
          row.reviewDate = formattedDate;
        }
        return row;
      });
      res.json(formattedRows);
    } catch (err) {
      console.error("쿼리 실행 중 오류 발생:", err);
      res.status(500).json({ error: "내부 서버 오류" });
    }
  }
);

//상세 페이지 - 리뷰 등록
app.post("/api/review_input", async (req, res) => {
  const { member_idx, store_id, comment, review_rating } = req.body;

  if (
    member_idx == null ||
    store_id == null ||
    comment == null ||
    review_rating == null
  ) {
    return res.status(400).json({ error: "모든 필드가 필요합니다." });
  }

  try {
    const query = `
      INSERT INTO reviews (member_idx, store_id, comment, review_rating, review_date)
      VALUES (?, ?, ?, ?, NOW())
    `;
    await connection.execute(query, [
      member_idx,
      store_id,
      comment,
      review_rating,
    ]);
    res.status(201).json({ message: "리뷰가 성공적으로 등록되었습니다." });
  } catch (error) {
    console.error("리뷰 등록 중 오류 발생:", error);
    res.status(500).json({ error: "리뷰 등록 중 오류 발생" });
  }
});

app.put(
  "/api/review_update/:review_id",
  async (req: Request, res: Response) => {
    const review_id = parseInt(req.params.review_id, 10);
    const { comment, review_rating } = req.body;

    if (comment == null || review_rating == null) {
      return res.status(400).json({ error: "댓글을 입력하세요." });
    }
    try {
      const query = `
      UPDATE reviews 
      SET comment = ?, review_rating = ?
      WHERE review_id = ?
      `;
      await connection.execute(query, [comment, review_rating, review_id]);
      res.json("리뷰 수정 완료");
    } catch (error) {
      console.error("리뷰 수정 중 오류 발생: ", error);
      res.status(500).json({ error: "리뷰 수정 중 오류 발생" });
    }
  }
);

// 상세 페이지 - 리뷰 삭제
app.delete(
  "/api/review_delete/:review_id",
  async (req: Request, res: Response) => {
    const { review_id } = req.params;
    try {
      const query = `DELETE FROM reviews WHERE review_id = ?`;
      await connection.execute(query, [review_id]);
      console.log("리뷰 삭제됨");
      res.status(200).json({ message: "리뷰 삭제 완료" });
    } catch (error) {
      console.error("리뷰 삭제 중 오류 발생: ", error);
      res.status(500).json({ error: "리뷰 삭제 중 오류 발생" });
    }
  }
);

// 민석님 서버

// 특정 가게의 모든 밀키트 재고 조회
app.get("/api/inventory/:store_id", async (req: Request, res: Response) => {
  const { store_id } = req.params;
  if (isNaN(Number(store_id))) {
    return res.status(400).json({ error: "Invalid store_id" });
  }
  try {
    const query = `
      SELECT i.store_id AS store_id, s.store_name, m.menu_id, m.menu_name, m.menu_description, m.menu_price, m.menu_image_url, i.quantity
      FROM inventory i
      JOIN stores s ON i.store_id = s.store_id
      JOIN menus m ON i.menu_id = m.menu_id
      WHERE i.store_id = ?
    `;
    const [rows] = await connection.execute(query, [store_id]);
    res.json(rows);
  } catch (err) {
    handleError(err, res);
  }
});

// 특정 가게의 특정 밀키트 재고 수량 업데이트
app.put(
  "/api/inventory/:store_id/:menu_id",
  async (req: Request, res: Response) => {
    const { store_id, menu_id } = req.params;
    const { quantity } = req.body;

    console.log("Received update request:", { store_id, menu_id, quantity });

    if (isNaN(Number(store_id)) || isNaN(Number(menu_id))) {
      return res.status(400).json({ error: "Invalid store_id or menu_id" });
    }

    if (typeof quantity !== "number" || isNaN(quantity) || quantity < 0) {
      return res.status(400).json({ error: "Invalid quantity value" });
    }

    try {
      const updateQuery = `
      UPDATE inventory 
      SET quantity = ?, last_updated = NOW() 
      WHERE store_id = ? AND menu_id = ?
    `;
      const [updateResult] = await connection.execute(updateQuery, [
        quantity,
        store_id,
        menu_id,
      ]);
      console.log("Update result:", updateResult);

      if ((updateResult as any).affectedRows === 0) {
        return res.status(404).json({ error: "Inventory item not found" });
      }

      const selectQuery = `
      SELECT i.menu_id, i.store_id, m.menu_name, m.menu_description, m.menu_price, m.menu_image_url, i.quantity
      FROM inventory i
      JOIN menus m ON i.menu_id = m.menu_id
      WHERE i.store_id = ? AND i.menu_id = ?
    `;
      const [selectResult] = await connection.execute(selectQuery, [
        store_id,
        menu_id,
      ]);
      console.log("Select result:", selectResult);

      if (Array.isArray(selectResult) && selectResult.length > 0) {
        res.json(selectResult[0]);
      } else {
        res.status(404).json({ error: "Updated inventory item not found" });
      }
    } catch (err) {
      console.error("Error in updating inventory:", err);
      res.status(500).json({
        error: "Failed to update inventory",
        details: (err as Error).message,
      });
    }
  }
);
// 모든 가게 정보 조회
app.get("/api/stores", async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM stores");
    res.json(rows);
  } catch (err) {
    handleError(err, res);
  }
});

// 사용자 목록 조회
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.execute(`
      SELECT 
        member_idx, 
        member_name,  
        member_id, 
        member_email, 
        member_phone,
        member_address 
      FROM member
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching member:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 사용자 삭제
app.delete("/api/users/:member_idx", async (req: Request, res: Response) => {
  //가져온 해당 사용자의 idx를 저장한다.
  const { member_idx } = req.params;

  try {
    // 1.(사용자 리뷰 삭제)
    const deleteReviews = `delete from reviews where member_idx = ${member_idx}`;

    //await 를 사용해서 쿼리문의 결과가 나올떄 까지 기달려야함
    //안그럼 동시에 작업이 진행되서 오류를 발생할수있다.
    await connection.query(deleteReviews);

    //성공적으로 리뷰가 삭제됨
    console.log("사용자의 리뷰가 삭제됨");

    // 2.(찜삭제)
    const deleteJim = `delete from favorites where member_idx = ${member_idx}`;
    await connection.query(deleteJim);

    // 3.(사용자 삭제)
    const deleteMember = `delete from member where member_idx = ${member_idx}`;

    //결과
    const [result] = (await connection.query(deleteMember)) as any[];

    if ((result as any).affectedRows > 0) {
      res.json({ message: "사용자의 정보가 모두 삭제되었습니다." });
    } else {
      res.status(404).json({ error: "삭제할 사용자를 찾을수없다." });
    }
  } catch (error) {
    console.error("사용자 삭제 중 오류 발생", error);
    res.status(500).json({ error: "서버 내부 오류" });
  }
});

// 새로운 밀키트 등록
app.post("/api/mealkit", async (req: Request, res: Response) => {
  const conn = await connection.getConnection(); // 데이터베이스 연결 가져오기

  try {
    await conn.beginTransaction(); // 트랜잭션 시작

    const {
      store_id,
      menu_name,
      menu_description,
      menu_price,
      menu_image_url,
      menu_cooking_time,
      menu_difficulty,
      menu_calories,
      quantity,
    } = req.body; // 요청 본문에서 데이터 추출

    console.log(req.body);

    // 데이터 유효성 검사
    if (
      !store_id ||
      !menu_name ||
      !menu_description ||
      !menu_price ||
      !menu_image_url ||
      !menu_cooking_time ||
      !menu_difficulty ||
      !menu_calories ||
      !quantity
    ) {
      console.log("유효성 검사 실패:", req.body);
      return res.status(400).json({ error: "모든 필드를 입력해주세요." }); // 필드가 누락된 경우 에러 응답
    }

    // menus 테이블에 새 메뉴 추가
    const [menuResult] = await conn.execute(
      `INSERT INTO menus (store_id , menu_name, menu_description, menu_price, menu_image_url, menu_cooking_time, menu_difficulty, menu_calories)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Number(store_id),
        menu_name,
        menu_description,
        Number(menu_price),
        menu_image_url,
        Number(menu_cooking_time),
        menu_difficulty,
        Number(menu_calories),
      ]
    );
    const menu_id = (menuResult as any).insertId; // 삽입된 메뉴 ID 가져오기
    console.log("메뉴 추가 성공, menuId:", menu_id);

    // inventory 테이블에 재고 정보 추가
    await conn.execute(
      `INSERT INTO inventory (menu_id, store_id, quantity, last_updated)
       VALUES (?, ?, ?, NOW())`,
      [menu_id, Number(store_id), Number(quantity)]
    );
    console.log("재고 정보 추가 성공");

    // storeMenus 테이블에 가게와 메뉴 연결 정보 추가
    await conn.execute(
      `INSERT INTO store_menus (store_id, menu_id)
       VALUES (?, ?)`,
      [Number(store_id), menu_id]
    );
    console.log("가게와 메뉴 연결 정보 추가 성공");

    await conn.commit(); // 트랜잭션 커밋
    res
      .status(201)
      .json({ message: "밀키트가 성공적으로 등록되었습니다.", menu_id }); // 성공 응답
  } catch (error) {
    await conn.rollback(); // 트랜잭션 롤백
    console.error("Error registering mealkit:", error); // 에러 로그 출력
    res.status(500).json({
      error: "밀키트 등록 중 오류가 발생했습니다.",
      details: (error as Error).message,
    }); // 에러 응답
  } finally {
    conn.release(); // 연결 해제
  }
});

// 이미지 및 밀키트 삭제
app.delete("/api/mealkit/:menu_id", async (req: Request, res: Response) => {
  const { menu_id } = req.params; // 요청 파라미터에서 menuId 추출

  const conn = await connection.getConnection(); // 데이터베이스 연결 가져오기

  try {
    await conn.beginTransaction(); // 트랜잭션 시작

    // 해당 메뉴의 imageUrl 가져오기
    const [menuRows] = await conn.execute(
      `SELECT image_url FROM menus WHERE menu_id = ?`,
      [menu_id]
      //SELECT * FROM menus WHERE menu_id = ? AND store_id = ?
      //[menu_id, store_id] //보안처리
    );

    if ((menuRows as any).length === 0) {
      throw new Error("해당 메뉴를 찾을 수 없습니다.");
    }

    // menus, inventory 및 storeMenus 테이블에서 메뉴 데이터 삭제
    await conn.execute(`DELETE FROM menus WHERE menu_id = ?`, [menu_id]);
    await conn.execute(`DELETE FROM inventory WHERE menu_id = ?`, [menu_id]);
    await conn.execute(`DELETE FROM store_menus WHERE menu_id = ?`, [menu_id]);

    await conn.commit(); // 트랜잭션 커밋
    res
      .status(200)
      .json({ message: "밀키트와 이미지가 성공적으로 삭제되었습니다." }); // 성공 응답
  } catch (error) {
    await conn.rollback(); // 트랜잭션 롤백
    console.error("Error deleting mealkit:", error); // 에러 로그 출력
    res.status(500).json({
      error: "밀키트 삭제 중 오류가 발생했습니다.",
      details: (error as Error).message,
    }); // 에러 응답
  } finally {
    conn.release(); // 연결 해제
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
