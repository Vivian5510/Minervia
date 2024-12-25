package com.rosy;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.engine.VelocityTemplateEngine;
import com.baomidou.mybatisplus.generator.fill.Column;

import java.util.List;

public class CodeGenerator {
    public static void main(String[] args) {
        FastAutoGenerator.create("jdbc:mysql://localhost:3306/minervia", "root", "101673")
                .globalConfig(builder -> builder
                        .author("Rosy")
                        .outputDir("G:\\Material\\Codes\\minervia\\minervia\\minervia-main\\src\\main\\java")
                        .commentDate("yyyy-MM-dd")
                )
                .packageConfig(builder -> builder
                        .parent("com.rosy.minervia")
                        .entity("domain")
                        .mapper("mapper")
                        .service("service")
                        .serviceImpl("service.impl")
                        .xml("mapper.xml")
                )
                .strategyConfig(builder -> builder
                        .entityBuilder()
                        .logicDeleteColumnName("del_flag")
                        .versionColumnName("version")
                        .addTableFills(List.of(
                                new Column("create_time", FieldFill.INSERT),
                                new Column("create_by", FieldFill.INSERT),
                                new Column("update_time", FieldFill.INSERT_UPDATE),
                                new Column("update_by", FieldFill.INSERT_UPDATE)
                        ))
                )
                .strategyConfig(builder -> builder
                        .addInclude(
                                "minervia_banner",
                                "minervia_category",
                                "minervia_category_item",
                                "minervia_records",
                                "minervia_models",
                                "wx_login")
                        .addTablePrefix("minervia_")
                        .entityBuilder()
                        .enableLombok()
                )
                .templateEngine(new VelocityTemplateEngine())
                .execute();
    }
}
