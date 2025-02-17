-- MySQL 또는 PostgreSQL을 사용하여 여러 단계의 승인 및 반려가 가능한 결재 시스템을 구축하는 시나리오에서,
-- 1. 필요한 테이블을 최소한으로 정의해 주세요.
CREATE TABLE user (
    id    BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE approval_document (
    id   BIGINT PRIMARY KEY AUTO_INCREMENT,
    requester_id BIGINT NOT NULL,  -- 결재 요청자 ID
    title        VARCHAR(255) NOT NULL,
    content      TEXT,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status       ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    FOREIGN KEY (requester_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE approval_request (
    id           BIGINT PRIMARY KEY AUTO_INCREMENT,
    approval_document_id  BIGINT NOT NULL,
    approver_id   BIGINT NOT NULL,  -- 결재 승인자 ID
    approval_level INT NOT NULL,  -- 결재 단계 (1: 팀장, 2: 부장, 3: 사장 등)
    status        ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    completed_at  TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (approval_document_id) REFERENCES approval_document(id) ON DELETE CASCADE,
    FOREIGN KEY (approver_id) REFERENCES user(id) ON DELETE CASCADE
);

-- 2. 특정 사용자가 처리해야 할 결재 건을 나열하는 query를 작성해주세요.
SELECT
    d.id AS document_id,
    d.title,
    d.content,
    d.updated_at,
    r.status AS approval_status
FROM approval_request AS r
JOIN approval_document AS d ON r.approval_document_id = d.id
WHERE r.approver_id = ?  -- 특정 사용자의 ID 
  AND r.status = 'PENDING'  -- 대기 상태의 결재 건만 조회
  AND NOT EXISTS (
      SELECT 1 
      FROM approval_request AS prev_r
      WHERE prev_r.approval_document_id = r.approval_document_id  -- 이전 결재 요청에서
        AND prev_r.approval_level < r.approval_level  -- 나보다 결재 단계가 낮은 사람들 중에
        AND prev_r.status = 'PENDING'  -- 아직 결재하지 않은 사람이 있다면 제외
  )
ORDER BY d.updated_at ASC;







