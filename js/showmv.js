async function loadData() {
    try {
        // 根据 source1 选择加载 hot.json 或 new.json 的数据
        const response = await fetch(source1 === "hotdata" ? "../homework/resources/hot.json" : "../homework/resources/new.json");
        const jsonData = await response.json();

        // 根据 songarea 和 songversion 过滤数据
        let filteredData;

        if (songarea === 0 && songversion === 0) {
            // 如果 songarea 和 songversion 都为 0，则加载所有数据
            filteredData = jsonData;
        } else if (songarea === 0 && songversion !== 0) {
            // 如果 songarea 为 0，songversion 不为 0，则根据 songversion 过滤数据
            filteredData = jsonData.filter(item => item.verison === songversion);
        } else if (songarea !== 0 && songversion === 0) {
            // 如果 songarea 不为 0，songversion 为 0，则根据 songarea 过滤数据
            filteredData = jsonData.filter(item => item.area === songarea);
        } else {
            // 否则，根据 songarea 和 songversion 过滤数据
            filteredData = jsonData.filter(item => item.area === songarea && item.verison === songversion);
        }

        // 获取 HTML 结构中的 .mainsmusic 元素
        const mainsmusicElement = document.querySelector('.mainsmusic');

        // 清空现有内容
        mainsmusicElement.innerHTML = '';


        // 遍历过滤后的数据，为每个数据项创建 HTML 结构并插入页面
        filteredData.forEach(item => {
            // 创建一个包含音乐信息的单个容器元素
            const musicsingleElement = document.createElement('div');
            musicsingleElement.classList.add('musicsingle');

            // 创建包含音乐封面的链接元素
        const musicimgcoverElement = document.createElement('a');
        musicimgcoverElement.classList.add('musicimgcover');
        musicimgcoverElement.href = item.picurl;
        musicimgcoverElement.target = '_blank';
        musicimgcoverElement.title = item.title;

        // 创建包含音乐封面图片的元素
        const musicimgElement = document.createElement('div');
        musicimgElement.classList.add('musicimg');

        // 创建图片元素并设置属性
        const imgElement = document.createElement('img');
        imgElement.setAttribute('loading', 'lazy');
        imgElement.src = item.picurl;
        imgElement.alt = item.title;
        imgElement.dataset.qarDef = '//y.qq.com/mediastyle/global/img/mv_300.png?max_age=2592000';

        // 创建播放图标元素
        const iconPlayElement = document.createElement('i');
        iconPlayElement.classList.add('mod_cover__icon_play');

        // 将图片和播放图标添加到音乐封面元素
        musicimgElement.appendChild(imgElement);
        musicimgElement.appendChild(iconPlayElement);

        // 将音乐封面元素添加到链接元素
        musicimgcoverElement.appendChild(musicimgElement);

        // 创建包含音乐标题的元素
        const mvListTitleElement = document.createElement('h3');
        mvListTitleElement.classList.add('mv_list__title');

        // 创建标题链接元素并设置内容
        const titleLinkElement = document.createElement('a');
        titleLinkElement.textContent = item.title;

        // 将标题链接元素添加到标题元素
        mvListTitleElement.appendChild(titleLinkElement);

        // 创建包含歌手信息的元素
        const mvListSingerElement = document.createElement('p');
        mvListSingerElement.classList.add('mv_list__singer');

        // 创建歌手链接元素并设置内容
        const singerLinkElement = document.createElement('a');
        singerLinkElement.classList.add('playlist__author');
        singerLinkElement.title = item.singers[0].name;
        singerLinkElement.href = item.singers[0].picurl;
        singerLinkElement.target = '_blank';
        singerLinkElement.textContent = item.singers[0].name;

        // 将歌手链接元素添加到歌手元素
        mvListSingerElement.appendChild(singerLinkElement);

        // 创建用于显示信息的元素（假设你想保留这个 ID）
        const mvListInfoElement = document.createElement('div');
        mvListInfoElement.classList.add('mv_list__info');
        mvListInfoElement.id = 'currentDate';

        // 将所有创建的元素添加到单个音乐容器中
        musicsingleElement.appendChild(musicimgcoverElement);
        musicsingleElement.appendChild(mvListTitleElement);
        musicsingleElement.appendChild(mvListSingerElement);
        musicsingleElement.appendChild(mvListInfoElement);

            // 将单个音乐容器添加到页面中
            mainsmusicElement.appendChild(musicsingleElement);
        });
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

// 页面加载完成时初始化数据
document.addEventListener("DOMContentLoaded", loadData);

// 监听 source1、songarea 和 songversion 变化时重新加载数据
document.addEventListener("source1Changed", loadData);
document.addEventListener("songareaChanged", loadData);
document.addEventListener("songversionChanged", loadData);
