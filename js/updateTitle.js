// 监听全局变量变化
document.addEventListener("DOMContentLoaded", function () {
    // 初始化时更新显示
    updateFilterDisplay();

    // 监听 songarea 变化
    document.addEventListener("songareaChanged", function () {
        updateFilterDisplay();
    });

    // 监听 songversion 变化
    document.addEventListener("songversionChanged", function () {
        updateFilterDisplay();
    });
});

function updateFilterDisplay() {
    // 获取元素
    const titleContainer = document.querySelector('.part_detail__hd .part_detail__tit');
    const sortbox = document.getElementById('sortbox');

    // 获取全局变量
    const songarea = getGlobalVariable('songarea');
    const songversion = getGlobalVariable('songversion');

    // 创建新的标题容器
    const newTitleContainer = document.createElement('div');
    newTitleContainer.classList.add('filter-container');

    // 更新显示
    if (songarea !== 0 || songversion !== 0) {
        // 显示边框和清零按钮
        newTitleContainer.innerHTML = `
            <div class="filter-item" id="songareaFilter">
                ${songarea !== 0 ? `<span class="filter-label">${getAreaName(songarea)}</span><span class="clear-button" data-filter-type="songarea">&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>` : ''}
            </div>
            <div class="filter-item" id="songversionFilter">
                ${songversion !== 0 ? `<span class="filter-label">${getVersionName(songversion)}</span><span class="clear-button" data-filter-type="songversion">&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>` : ''}
            </div>
        `;
        // 添加 flex 样式，让两个过滤项水平排列
        newTitleContainer.style.display = 'flex';

        // 添加点击事件委托
        newTitleContainer.addEventListener('click', function (event) {
            if (event.target.classList.contains('clear-button')) {
                const filterType = event.target.getAttribute('data-filter-type');
                clearFilter(filterType);
            }
        });
    } else {
        // 显示原始标题
        newTitleContainer.innerHTML = '全部MV';
    }

    // 插入新标题容器
    titleContainer.innerHTML = '';
    titleContainer.appendChild(newTitleContainer);
}

function getAreaName(areaId) {
    // 从 filter.js 获取区域名称
    return area[areaId] || '';
}

function getVersionName(versionId) {
    // 从 filter.js 获取版本名称
    return verison[versionId] || '';
}

function clearFilter(filterType) {
    // 清零 songarea 或 songversion，并触发相应的事件
    if (filterType === 'songarea') {
        setGlobalVariable('songarea', 0);
        console.log("当前 songarea 值为: ", songarea);

        const areaElement = document.getElementById("areaSection");
        areaElement.querySelectorAll('.selecter_2_op').forEach(link => {
            if (link.id === "0") {
                link.classList.add('selecter_2_op--select');
            } else {
                link.classList.remove('selecter_2_op--select');
            }
        });

        document.dispatchEvent(new Event("songareaChanged"));
    } else if (filterType === 'songversion') {
        setGlobalVariable('songversion', 0);
        console.log("当前 songversion 值为: ", songversion);
        
        const areaElement = document.getElementById("versionSection");
        areaElement.querySelectorAll('.selecter_2_op').forEach(link => {
            if (link.id === "0") {
                link.classList.add('selecter_2_op--select');
            } else {
                link.classList.remove('selecter_2_op--select');
            }
        });


        document.dispatchEvent(new Event("songversionChanged"));
    }
}

function setGlobalVariable(variableName, value) {
    // Set the global variable value
    // You need to adjust this logic based on your actual requirements
    if (variableName === 'songarea') {
        window.songarea = value;
    } else if (variableName === 'songversion') {
        window.songversion = value;
    }
}

function getGlobalVariable(variableName) {
    // 获取全局变量的值
    // 你需要根据实际情况修改这部分的逻辑
    // 这里只是一个示例
    if (variableName === 'songarea') {
        return window.songarea;
    } else if (variableName === 'songversion') {
        return window.songversion;
    }
}