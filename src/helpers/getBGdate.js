export const getBGdate = function() {
    const date = new Date();
const day = date.getDate().toString().padStart(2, '0');
const monthsMapping = {
    0: "Януари",
    1: "Февуари",
    2: "Март",
    3: "Април",
    4: "Май",
    5: "Юни",
    6: "Юли",
    7: "Август",
    8: "Септември",
    9: "Октомври",
    10: "Ноември",
    11: "Декември",
}
const month = monthsMapping[date.getMonth()];
const year = date.getFullYear();

return `${day} ${month} ${year}`
}