class Throttle {
    private timer: NodeJS.Timeout | undefined;
    private stop: boolean = false;
    private death: boolean = false;
    public use(
      func: Function,
      delay: number,
      immediate: boolean = false
    ): Function {
      let flag = true;
      const self = this;
      return (...args: any) => {
        if (this.death) {
          func.apply(this, args);
          return;
        }
        if (this.stop) {
          func.apply(this, args);
          return;
        }
        if (immediate) {
          func.apply(this, args);
          immediate = false;
          return;
        }
        if (!flag) {
          return;
        }
        flag = false;
        self.timer = setTimeout(() => {
          func.apply(this, args);
          flag = true;
        }, delay);
      };
    }
  
    // 销毁
    public destroy() {
      this.death = true;
      this.stop = true;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = undefined;
      }
    }
  
    // 开启
    public open() {
      if (!this.death) {
        this.stop = false;
      }
    }
  
    // 关闭
    public close() {
      this.stop = true;
    }
}
  
export {
    Throttle
}