Component({
    /**
     * 组件的属性列表
     */
    properties: {
      title: {
        type: String,
        value: '标题'
      }
    },

    /**
     * 组件的初始数据
     */
    data: {
      //弹窗显示控制
      showModalStatus: false
    },
    /**
     * 组件的方法列表
     */
    methods: {
      //点击显示底部弹出
      changeRange: function () {
        this.showModal();
      },

      //底部弹出框
      showModal: function () {
        // 背景遮罩层
        var animation = swan.createAnimation({
          duration: 200,
          timingFunction: "linear",
          delay: 0
        })
        //this.animation = animation
        animation.translateY(300).step()
        this.setData({
          animationData: animation.export(),
          showModalStatus: true
        })
        setTimeout(function () {
          animation.translateY(0).step()
          this.setData({
            animationData: animation.export()
          })
        }.bind(this), 200)
      },

      //点击背景面任意一处时，弹出框隐藏
      hideModal: function () {
        //弹出框消失动画
        var animation = swan.createAnimation({
          duration: 200,
          timingFunction: "linear",
          delay: 0
        })
        //this.animation = animation
        animation.translateY(300).step()
        this.setData({
          animationData: animation.export(),
        })
        setTimeout(function () {
          animation.translateY(0).step()
          this.setData({
            animationData: animation.export(),
            showModalStatus: false
          })
        }.bind(this), 200)
      },
    }
  })