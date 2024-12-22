package com.rosy.web.controller.tool;

import com.rosy.common.core.controller.BaseController;
import com.rosy.common.core.domain.R;
import com.rosy.common.utils.StringUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Knife4j 用户测试方法
 */
@RestController
@RequestMapping("/test/user")
public class TestController extends BaseController {
    private final static Map<Integer, UserEntity> users = new LinkedHashMap<Integer, UserEntity>();

    static {
        users.put(1, new UserEntity(1, "admin", "admin123", "15888888888"));
        users.put(2, new UserEntity(2, "ry", "admin123", "15666666666"));
    }

    @Operation(summary = "获取用户列表", description = "获取系统中所有用户的列表")
    @GetMapping("/list")
    public R<List<UserEntity>> userList() {
        List<UserEntity> userList = new ArrayList<>(users.values());
        return R.ok(userList);
    }

    @Operation(summary = "获取用户详细", description = "根据用户ID获取用户详细信息")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "成功返回用户信息"),
            @ApiResponse(responseCode = "404", description = "用户不存在")
    })
    @GetMapping("/{userId}")
    public R<UserEntity> getUser(@Parameter(description = "用户ID", required = true) @PathVariable Integer userId) {
        if (!users.isEmpty() && users.containsKey(userId)) {
            return R.ok(users.get(userId));
        } else {
            return R.fail("用户不存在");
        }
    }

    @Operation(summary = "新增用户", description = "新增一个用户信息")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "用户新增成功"),
            @ApiResponse(responseCode = "400", description = "用户ID不能为空")
    })
    @PostMapping("/save")
    public R<String> save(@RequestBody UserEntity user) {
        if (StringUtils.isNull(user) || StringUtils.isNull(user.getUserId())) {
            return R.fail("用户ID不能为空");
        }
        users.put(user.getUserId(), user);
        return R.ok();
    }

    @Operation(summary = "更新用户", description = "更新用户的基本信息")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "用户更新成功"),
            @ApiResponse(responseCode = "404", description = "用户不存在")
    })
    @PutMapping("/update")
    public R<String> update(@RequestBody UserEntity user) {
        if (StringUtils.isNull(user) || StringUtils.isNull(user.getUserId())) {
            return R.fail("用户ID不能为空");
        }
        if (users.isEmpty() || !users.containsKey(user.getUserId())) {
            return R.fail("用户不存在");
        }
        users.remove(user.getUserId());
        users.put(user.getUserId(), user);
        return R.ok();
    }

    @Operation(summary = "删除用户", description = "删除指定ID的用户")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "用户删除成功"),
            @ApiResponse(responseCode = "404", description = "用户不存在")
    })
    @DeleteMapping("/{userId}")
    public R<String> delete(@Parameter(description = "用户ID", required = true) @PathVariable Integer userId) {
        if (!users.isEmpty() && users.containsKey(userId)) {
            users.remove(userId);
            return R.ok();
        } else {
            return R.fail("用户不存在");
        }
    }
}

/**
 * 用户实体类
 */
@Schema(description = "用户实体")
class UserEntity {

    @Schema(description = "用户ID", example = "1")
    private Integer userId;

    @Schema(description = "用户名称", example = "admin")
    private String username;

    @Schema(description = "用户密码", example = "admin123")
    private String password;

    @Schema(description = "用户手机", example = "15888888888")
    private String mobile;

    public UserEntity() {
    }

    public UserEntity(Integer userId, String username, String password, String mobile) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.mobile = mobile;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
}
