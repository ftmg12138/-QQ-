var songversion = 0; // 未声明的全局变量
document.addEventListener("DOMContentLoaded", function () {
    // 获取版本元素
    const versionElement = document.getElementById("versionSection");

    // 点击事件处理函数
    function handleClick(event) {
        // 防止默认行为
        event.preventDefault();

        // 获取被点击的元素的id
        const clickedId = event.target.id;
        // 检查点击的元素是否包含 selecter_2_op 类
        if (event.target.classList.contains('selecter_2_op')) {
            // 设置全局变量 songversion 为被点击元素的id
            updateSongVersion(clickedId);

            // 遍历所有子元素，添加和移除样式类
            versionElement.querySelectorAll('.selecter_2_op').forEach(link => {
                if (link.id === clickedId) {
                    link.classList.add('selecter_2_op--select');
                } else {
                    link.classList.remove('selecter_2_op--select');
                }
            });

            // 在此处可以使用全局变量 songversion，根据需要进行其他操作
            console.log("当前 songversion 值为: ", songversion);

            // 在点击后触发自定义事件
            document.dispatchEvent(new Event("songversionChanged"));
        }
    }

    // 添加点击事件监听器到版本元素
    versionElement.addEventListener("click", handleClick);

    // 更新 songversion 的函数
    function updateSongVersion(newValue) {
        songversion = parseInt(newValue, 10) || 0; // 如果转换失败，默认为 0
    }
});
