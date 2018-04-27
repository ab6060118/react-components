# react-components
## How to run
npm install   
npm run run-server

## IE 10 flexbox fix
1. 為了修正 flex-direction: column 元件高度顯示問題，將所有元件都加上 min-height: 1px，以及視情況加入 flex-shrink 屬性
1. flex 屬性在 IE 當中的表現為 flex-grow:1; <span style="color:red;">flex-shrink:0;</span> flex-basis:0%;
