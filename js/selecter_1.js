// Remove the 'let' keyword to make source1 a global variable
// This assumes that you don't have 'let' or 'const' before 'source1' elsewhere in this file
var source1 = "newdata"; // 默认为最新

document.addEventListener("DOMContentLoaded", function () {
    // 获取最新和最热的元素
    const newestElement = document.querySelector('.part_switch__item[title="最新"]');
    const hottestElement = document.querySelector('.part_switch__item[title="最热"]');

    // 点击事件处理函数
    function handleClick(event) {
        // 防止默认行为
        event.preventDefault();

        // 判断点击的是最新还是最热
        if (event.target === newestElement) {
            updateSource1("newdata");
            // 添加和移除样式类
            newestElement.classList.add('part_switch__item--select');
            hottestElement.classList.remove('part_switch__item--select');
        } else if (event.target === hottestElement) {
            updateSource1("hotdata");
            // 添加和移除样式类
            hottestElement.classList.add('part_switch__item--select');
            newestElement.classList.remove('part_switch__item--select');
        }

        // 在此处可以使用全局变量 source1，根据需要进行其他操作
        console.log("当前 source1 值为: ", source1);

        // 在点击后触发自定义事件
        document.dispatchEvent(new Event("source1Changed"));
    }

    // 添加点击事件监听器
    newestElement.addEventListener("click", handleClick);
    hottestElement.addEventListener("click", handleClick);

    // 更新 source1 的函数
    function updateSource1(newValue) {
        source1 = newValue;
    }
});
