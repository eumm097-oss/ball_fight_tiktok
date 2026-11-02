/* 볼파이트 알림용 서비스 워커: 매칭이 잡혔을 때 띄운 알림을 누르면 게임 화면으로 돌아감 (요청은 가로채지 않음) */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(L=>{
    for(const c of L)if('focus' in c)return c.focus();
    if(self.clients.openWindow)return self.clients.openWindow('./');
  }));
});
