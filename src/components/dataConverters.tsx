// export function formatDate(date) {
//     var d = new Date(date);
//     var hh = d.getHours();
//     var m = d.getMinutes();
//     var s = d.getSeconds();
//     var dd = "AM";
//     var h = hh;
//     if (h >= 12) {
//         h = hh - 12;
//         dd = "PM";
//     }
//     if (h == 0) {
//         h = 12;
//     }
//     m = m < 10 ? "0" + m : m;

//     s = s < 10 ? "0" + s : s;
//     /* if you want 2 digit hours:
//     h = h<10?"0"+h:h; */

//     var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);

//     var replacement = h + ":" + m;
//     /* if you want to add seconds
//     replacement += ":"+s;  */
//     replacement += " " + dd;

//     return date.replace(pattern, replacement);
// }

export function getInitials(string: any) {
    var names = string?.split(' '),
        initials = names[0]?.substring(0, 1)?.toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1]?.substring(0, 1)?.toUpperCase();
    }
    return initials;
}