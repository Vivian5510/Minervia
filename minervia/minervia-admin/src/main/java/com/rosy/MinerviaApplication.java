package com.rosy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

/**
 * 启动程序
 *
 * @author rosy
 */
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class MinerviaApplication {
    public static void main(String[] args) {
        // System.setProperty("spring.devtools.restart.enabled", "false");
        SpringApplication.run(MinerviaApplication.class, args);
        System.out.println("(♥◠‿◠)ﾉﾞ  Minervia启动成功   ლ(´ڡ`ლ)ﾞ  \n");
    }
}
