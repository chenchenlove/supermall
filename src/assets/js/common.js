//传入需要防抖的函数 func  delay是延迟时间
export function debunce(func,delay){
    let timer = null
    return function(...args){
        if (timer) clearTimeout(timer)//如果timer存在清除timer及放弃请求或刷新
        timer = setTimeout(() => {
            func.apply(this,args)//在delay时间之后就调用方法
        }, delay);
    }
}