// пункты меню (шапка и нижнее меню на телефоне)
const menu = [
    { title: "МУЖЧИНАМ", link: "/catalog?gender=Мужской", mega: "men" },
    { title: "ЖЕНЩИНАМ", link: "/catalog?gender=Женский", mega: "women" },
    { title: "ДЕТЯМ", link: "/catalog?gender=Мужской", mega: "kids" },
    { title: "ВИДЫ СПОРТА", link: "/catalog", mega: "sport" },
    { title: "СКИДКИ", link: "/catalog?sale=1", red: true },
    { title: "АКЦИИ", link: "/catalog?sale=1" },
];

export default menu;
