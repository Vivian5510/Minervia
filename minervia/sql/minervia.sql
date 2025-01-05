CREATE DATABASE IF NOT EXISTS `minervia`;
USE `minervia`;


SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------
-- Table structure for table `minervia_banner`
-- -----------------------------------------------
DROP TABLE IF EXISTS `minervia_banner`;
CREATE TABLE `minervia_banner`
(
    `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `image`       VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '图片路径',
    `title`       VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'banner中的标题',
    `url`         VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '点击banner图片跳转路径',
    `create_time` DATETIME     NOT NULL                                         DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME     NOT NULL                                         DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `del_flag`    INT                                                           DEFAULT 0 COMMENT '0 正常 1 删除',
    `order_num`   INT                                                           DEFAULT NULL COMMENT '排序字段',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 5
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_unicode_ci
  ROW_FORMAT = DYNAMIC;

INSERT INTO `minervia_banner` (`image`, `title`, `url`, `order_num`)
VALUES ('https://resource.tuniaokj.com/images/xiongjie/x14.jpg', 'Banner Title 1', 'https://example.com/1', 1),
       ('https://resource.tuniaokj.com/images/xiongjie/xiong-3d-2.jpg', 'Banner Title 2', 'https://example.com/2', 2),
       ('https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg', 'Banner Title 3', 'https://example.com/3', 3),
       ('https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png', 'Banner Title 3', 'https://example.com/3',
        4);



-- -------------------------------------------------
-- Table structure for table `minervia_category`
-- -------------------------------------------------
DROP TABLE IF EXISTS `minervia_category`;
CREATE TABLE `minervia_category`
(
    `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `text`        VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '宫格中的文本',
    `src`         VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '宫格中的图片地址',
    `name`        VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '宫格技术名称',
    `create_time` DATETIME     NOT NULL                                         DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME     NOT NULL                                         DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `del_flag`    INT                                                           DEFAULT 0 COMMENT '0 正常 1 删除',
    `order_num`   INT                                                           DEFAULT NULL COMMENT '排序字段',
    `enable`      TINYINT(1)                                                    DEFAULT 1 COMMENT '是否启用',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 14
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_unicode_ci
  ROW_FORMAT = DYNAMIC;

INSERT INTO `minervia_category` (`text`, `src`, `name`, `order_num`, `del_flag`, `enable`)
VALUES ('人工智能', 'http://sogoqjp87.hn-bkt.clouddn.com/2024/12/14/iconly-icon-export-1735205458.png', 'AI', 1, 0, 1),
       ('机器学习', 'http://sogoqjp87.hn-bkt.clouddn.com/2024/12/14/iconly-icon-export-1735205461.png',
        'Machine Learning', 2, 0, 1),
       ('深度学习', 'http://sogoqjp87.hn-bkt.clouddn.com/2024/12/14/iconly-icon-export-1735205469.png', 'Deep Learning',
        3, 0, 1),
       ('自然语言处理', 'http://sogoqjp87.hn-bkt.clouddn.com/2024/12/14/iconly-icon-export-1735205477.png',
        'Natural Language Processing', 4, 0, 1),
       ('计算机视觉', 'http://sogoqjp87.hn-bkt.clouddn.com/2024/12/14/iconly-icon-export-1735205493.png',
        'Computer Vision', 5, 0, 1),
       ('数据挖掘', 'http://sogoqjp87.hn-bkt.clouddn.com/2024/12/14/iconly-icon-export-1735205510.png', 'Data Mining',
        6, 0, 1),
       ('云计算', 'http://sogoqjp87.hn-bkt.clouddn.com/2024/12/14/iconly-icon-export-1735205500.png', 'Cloud Computing',
        7, 0, 1),
       ('边缘计算', 'http://sogoqjp87.hn-bkt.clouddn.com/2024/12/14/iconly-icon-export-1735205507.png',
        'Edge Computing', 8, 0, 1),
       ('物联网', 'http://sogoqjp87.hn-bkt.clouddn.com/2024/12/14/iconly-icon-export-1735205480.png',
        'Internet of Things', 9, 0, 1);



-- ------------------------------------------------------
-- Table structure for table `minervia_category_item`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `minervia_category_item`;
CREATE TABLE `minervia_category_item`
(
    `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `text`        VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '下拉框展示的文本',
    `value`       VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '下拉框具体的值',
    `create_time` DATETIME     NOT NULL                                         DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME     NOT NULL                                         DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `del_flag`    INT                                                           DEFAULT 0 COMMENT '0 正常 1 删除',
    `category`    VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '所属的技术分类',
    `order_num`   INT                                                           DEFAULT NULL COMMENT '排序字段',
    PRIMARY KEY (`id`) USING BTREE,
    INDEX `category` (`category` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 15
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_unicode_ci
  ROW_FORMAT = DYNAMIC;


-- ------------------------------------------------
-- Table structure for table `minervia_records`
-- ------------------------------------------------
DROP TABLE IF EXISTS `minervia_records`;
CREATE TABLE `minervia_records`
(
    `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `session_id`  VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '会话ID',
    `role`        VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '角色 assistant/user',
    `content`     TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci         DEFAULT NULL COMMENT '消息主体内容',
    `create_time` DATETIME     NOT NULL                                         DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME     NOT NULL                                         DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `openid`      VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL COMMENT '用户唯一ID',
    `category`    VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL COMMENT '具体的技术分类，关联category_item',
    `subject`     VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL COMMENT '面试科目，关联category',
    `del_flag`    INT                                                           DEFAULT 0 COMMENT '0 正常 1 删除',
    PRIMARY KEY (`id`) USING BTREE,
    INDEX `session_id` (`session_id` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 435
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_unicode_ci
  ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------
-- Table structure for table `minervia_models`
-- -----------------------------------------------
DROP TABLE IF EXISTS `minervia_models`;
CREATE TABLE `minervia_models`
(
    `id`              INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`            VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '模型名称',
    `url`             VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '调用模型的地址',
    `question_prompt` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci         DEFAULT NULL COMMENT '提问提示词',
    `answer_prompt`   TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci         DEFAULT NULL COMMENT '回答提示词',
    `role`            TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci         DEFAULT NULL COMMENT 'AI模型的身份设定',
    `create_time`     DATETIME     NOT NULL                                         DEFAULT CURRENT_TIMESTAMP,
    `update_time`     DATETIME     NOT NULL                                         DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `del_flag`        INT                                                           DEFAULT 0 COMMENT '0 正常 1 删除',
    `charge`          INT                                                           DEFAULT 0 COMMENT '0 免费 1 收费',
    `multiple`        INT                                                           DEFAULT 0 COMMENT '0 单轮对话 1 多轮对话',
    `order_num`       INT                                                           DEFAULT NULL COMMENT '排序字段',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `name` (`name` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 5
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_unicode_ci
  ROW_FORMAT = DYNAMIC;

INSERT INTO `minervia_models`
(`name`, `url`, `question_prompt`, `answer_prompt`, `role`, `create_time`, `update_time`, `del_flag`, `charge`,
 `multiple`, `order_num`)
VALUES ('ernie-lite-128k', 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/minervia',
        '请给我一道% s相关的选择题，选择题有四个选项，分别是A、B、C、D，并且只有一个正确答案，不允许多个正确答案，并且每个选项后面都要有一个换行符。给出题干就可以了，不需要给出答案，也不需要给出题目的解析，给出题干之后就结束返回，不要任何额外的内容。',
        '我选择%s，请问我的答案对吗？请对这道题做出详细解释',
        '角色与目标：
作为一名Java面试专家，你将根据用户要求生成技术领域相关的选择题和判断题（涵盖Java基础语法、SSM框架、分布式系统、微服务、MySQL、JVM、并发编程、消息中间件、Redis、架构设计等），并评估其技术水平。在用户完成答题后，你需要提供专业的反馈和建议，帮助用户识别知识盲点并提升技能。

任务流程：
1.根据用户请求的技术领域，生成相关的选择题或判断题。
2.题目格式：选择题采用A、B、C、D四个选项，每个选项后带有换行符。
3.题目生成时，不提供答案，等待用户答题后提供反馈。
4.在用户完成答题后，分析答题结果，评估其在不同技术领域的掌握情况。
5.根据用户的表现，提供个性化的学习建议，帮助其进一步提升技能。
6.如果用户答错，提供正向反馈，并推荐学习资源（书籍、在线课程等）。

个性化要求：
1.回复时保持专业且友好的语气，展现权威性的同时不失亲和力。
2.题目生成要确保清晰、简洁，避免歧义。每道题都要明确表达，选项要尽可能避免相似。
3.在答题后，提供详细反馈，指出正确与错误的地方，并提出改进建议。
4.若用户的答题结果较差，应给出鼓励性的反馈，引导其继续学习和进步。', NOW(), NOW(), 0, 0, 1, 1),

       ('ernie-speed', 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie_speed',
        '请给我一道%s相关的选择题，选择题有四个选项，分别是A、B、C、D，并且只有一个正确答案，不允许多个正确答案，并且每个选项后面都要有一个换行符。给出题干就可以了，不需要给出答案，也不需要给出题目的解析，给出题干之后就结束返回，不要任何额外的内容。',
        '我选择%s，请问我的答案对吗？请对这道题做出详细解释',
        '角色与目标：
作为一名Java面试专家，你将根据用户要求生成技术领域相关的选择题和判断题（涵盖Java基础语法、SSM框架、分布式系统、微服务、MySQL、JVM、并发编程、消息中间件、Redis、架构设计等），并评估其技术水平。在用户完成答题后，你需要提供专业的反馈和建议，帮助用户识别知识盲点并提升技能。

任务流程：
1.根据用户请求的技术领域，生成相关的选择题或判断题。
2.题目格式：选择题采用A、B、C、D四个选项，每个选项后带有换行符。
3.题目生成时，不提供答案，等待用户答题后提供反馈。
4.在用户完成答题后，分析答题结果，评估其在不同技术领域的掌握情况。
5.根据用户的表现，提供个性化的学习建议，帮助其进一步提升技能。
6.如果用户答错，提供正向反馈，并推荐学习资源（书籍、在线课程等）。

个性化要求：
1.回复时保持专业且友好的语气，展现权威性的同时不失亲和力。
2.题目生成要确保清晰、简洁，避免歧义。每道题都要明确表达，选项要尽可能避免相似。
3.在答题后，提供详细反馈，指出正确与错误的地方，并提出改进建议。
4.若用户的答题结果较差，应给出鼓励性的反馈，引导其继续学习和进步。', NOW(), NOW(), 0, 0, 0, 2),

       ('ernie-speed-128k', 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-speed-128k',
        '请给我一道%s相关的选择题，选择题有四个选项，分别是A、B、C、D，并且只有一个正确答案，不允许多个正确答案，并且每个选项后面都要有一个换行符。给出题干就可以了，不需要给出答案，也不需要给出题目的解析，给出题干之后就结束返回，不要任何额外的内容。？',
        '我选择%s，请问我的答案对吗？请对这道题做出详细解释',
        '角色与目标：
作为一名Java面试专家，你将根据用户要求生成技术领域相关的选择题和判断题（涵盖Java基础语法、SSM框架、分布式系统、微服务、MySQL、JVM、并发编程、消息中间件、Redis、架构设计等），并评估其技术水平。在用户完成答题后，你需要提供专业的反馈和建议，帮助用户识别知识盲点并提升技能。

任务流程：
1.根据用户请求的技术领域，生成相关的选择题或判断题。
2.题目格式：选择题采用A、B、C、D四个选项，每个选项后带有换行符。
3.题目生成时，不提供答案，等待用户答题后提供反馈。
4.在用户完成答题后，分析答题结果，评估其在不同技术领域的掌握情况。
5.根据用户的表现，提供个性化的学习建议，帮助其进一步提升技能。
6.如果用户答错，提供正向反馈，并推荐学习资源（书籍、在线课程等）。

个性化要求：
1.回复时保持专业且友好的语气，展现权威性的同时不失亲和力。
2.题目生成要确保清晰、简洁，避免歧义。每道题都要明确表达，选项要尽可能避免相似。
3.在答题后，提供详细反馈，指出正确与错误的地方，并提出改进建议。
4.若用户的答题结果较差，应给出鼓励性的反馈，引导其继续学习和进步。', NOW(), NOW(), 0, 0, 0, 3);



-- ------------------------------------
-- Table structure for table `wx_login`
-- ------------------------------------
DROP TABLE IF EXISTS `wx_login`;
CREATE TABLE `wx_login`
(
    `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `openid`      VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户唯一ID',
    `session_key` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '会话Key',
    `unionid`     VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `errcode`     VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `errmsg`      VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `create_time` DATETIME     NOT NULL                                         DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME     NOT NULL                                         DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `openid` (`openid` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 156
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_unicode_ci
  ROW_FORMAT = DYNAMIC;


SET FOREIGN_KEY_CHECKS = 1;



