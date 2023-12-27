var songarea = 0; // 未声明的全局变量

document.addEventListener("DOMContentLoaded", function () {
    // 获取区域元素
    const areaElement = document.getElementById("areaSection");

    // 点击事件处理函数
    function handleClick(event) {
        // 防止默认行为
        event.preventDefault();

        // 获取被点击的元素的id
        const clickedId = event.target.id;

        // 检查点击的元素是否包含 selecter_2_op 类
        if (event.target.classList.contains('selecter_2_op')) {
            // 设置全局变量 songarea 为被点击元素的id
            updateSongArea(clickedId);

            // 遍历所有子元素，添加和移除样式类
            areaElement.querySelectorAll('.selecter_2_op').forEach(link => {
                if (link.id === clickedId) {
                    link.classList.add('selecter_2_op--select');
                } else {
                    link.classList.remove('selecter_2_op--select');
                }
            });

            // 在此处可以使用全局变量 songarea，根据需要进行其他操作
            console.log("当前 songarea 值为: ", songarea);

            // 在点击后触发自定义事件
            document.dispatchEvent(new Event("songareaChanged"));
        }
    }

    // 添加点击事件监听器到区域元素
    areaElement.addEventListener("click", handleClick);

    // 更新 songarea 的函数
    function updateSongArea(newValue) {
        songarea = parseInt(newValue, 10) || 0; // 如果转换失败，默认为 0
    }
});
