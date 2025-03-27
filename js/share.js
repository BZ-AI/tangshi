// 社交分享功能
export const shareGame = {
    async toWeChat() {
        // 微信分享实现
        const shareData = {
            title: '唐诗三百首历史策略游戏',
            desc: '来体验一下古代诗人的生活吧！',
            link: window.location.href,
            imgUrl: '/images/share-icon.png'
        };
        
        if (typeof wx !== 'undefined') {
            wx.ready(() => {
                wx.shareTimeline(shareData);
                wx.shareAppMessage(shareData);
            });
        }
    },

    toWeibo() {
        const text = encodeURIComponent('我在玩唐诗三百首历史策略游戏，快来和我一起体验古代诗人的生活！');
        const url = encodeURIComponent(window.location.href);
        window.open(`http://service.weibo.com/share/share.php?url=${url}&title=${text}`);
    },

    // 其他分享方法...
}; 