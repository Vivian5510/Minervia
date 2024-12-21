<template>
  <div class="app-container welcome-page">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
        <blockquote class="text-primary" style="font-size: 18px">
          <h1>欢迎来到Minervia</h1>
          <p class="welcome-message">
            Minervia 是一个AI面试官，致力于智能化面试流程的自动化与高效化。它不仅能够帮助公司快速筛选合适的候选人，还能为面试官提供专业化的面试辅导和反馈。
          </p>
          <p class="welcome-message">
            无论您是招聘新员工，还是进行面试训练，Minervia都能为您提供高效、智能的支持。借助AI技术，Minervia能够分析面试过程中的每一环节，帮助您从容应对面试挑战。
          </p>
          <el-button type="primary" icon="el-icon-chat-dot-round" @click="goTarget('https://minervia.vip')">
            了解更多
          </el-button>
        </blockquote>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="features">
      <el-col :sm="24" :lg="12">
        <h2>核心功能</h2>
        <ul>
          <li>智能化面试官，自动筛选和评估候选人</li>
          <li>提供专业化面试反馈，帮助候选人进步</li>
          <li>支持多种面试形式（如视频面试、现场面试等）</li>
          <li>实时数据分析，帮助面试官优化面试策略</li>
          <li>自定义面试问题，灵活调整面试流程</li>
        </ul>
      </el-col>
      <el-col :sm="24" :lg="12">
        <h2>技术栈</h2>
        <ul>
          <li>AI技术：自然语言处理、机器学习</li>
          <li>后端技术：Python, Flask, TensorFlow</li>
          <li>前端技术：Vue, Element UI</li>
          <li>数据分析：Pandas, NumPy</li>
          <li>其他：Docker, Kubernetes</li>
        </ul>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
        <el-divider />
        <h3>联系我们</h3>
        <p>如果您有任何问题或建议，请联系我们：</p>
        <el-button type="text" @click="goTarget('mailto:support@minervia.vip')">
          support@minervia.vip
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const goTarget = (url) => {
  window.open(url, '__blank')
}
</script>

<style scoped lang="scss">
.welcome-page {
  font-family: 'Arial', sans-serif;
  padding: 20px;

  blockquote {
    padding: 20px;
    background-color: #f0f9ff;
    border-left: 5px solid #409EFF;
    margin-bottom: 20px;

    h1 {
      font-size: 36px;
      color: #409EFF;
      font-weight: bold;
    }

    .welcome-message {
      font-size: 18px;
      line-height: 1.5;
      color: #333;
      margin-top: 10px;
    }

    el-button {
      margin-top: 15px;
    }
  }

  .features {
    margin-top: 40px;

    h2 {
      font-size: 24px;
      color: #409EFF;
      margin-bottom: 15px;
    }

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;

      li {
        font-size: 16px;
        margin-bottom: 10px;
        color: #333;
      }
    }
  }

  .el-divider {
    margin-top: 40px;
  }

  h3 {
    font-size: 22px;
    color: #409EFF;
    margin-bottom: 10px;
  }

  el-button {
    color: #409EFF;
  }
}
</style>
