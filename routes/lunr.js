var lunr = require('lunr');
 //定義索引
var idx = lunr( function () {
    this .field( 'title' , { boost: 10 });
    this .field( 'body' );
});
//field 是什麼？
//添加索引
var doc = {
    'title' : '不不 ' ,
    'body' : '不' ,
    'author' : '不不不' ,
    'id' : 2
};
idx.add(doc);
//idx 裡有 pipeline

//搜索可用單字搜尋！
var result = idx.search( '不' );

console.log(result);
//返回結果
// [{
//     'ref' : 抓 ID (_ref:ID)
//     'score' : 相關程度>>>記住！
// }]

// 有累積分數！相關程度～
