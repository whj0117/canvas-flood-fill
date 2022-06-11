/*
 * @Author: wanghongjian
 * @Date: 2022-06-11 18:28:33
 * @LastEditors: wanghongjian
 */
import html2canvas from "html2canvas";

function getQueryStringRegExp(name) {
	var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
	if (reg.test(location.href))
		return unescape(RegExp.$2.replace(/\+/g, " "));
	return "";
}

function rgbToHex(rgb) {
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	function hex(x) {
		return ("0" + parseInt(x).toString(16)).slice(-2);
	}
	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

export function hexToRgb(hex) {
	var bigint = parseInt(hex, 16);
	var r = (bigint >> 16) & 255;
	var g = (bigint >> 8) & 255;
	var b = bigint & 255;

	return r + "," + g + "," + b;
}

export const randomColor = ()=> {
	const s = (Math.random() * 0xffffff * 1000000).toString(16);

	return s.slice(0, 6);
}

function colorToInt(fillcolor) {
	return ((fillcolor[0] & 0xFF) << 24) | ((fillcolor[1] & 0xFF) << 16)
		| ((fillcolor[2] & 0xFF) << 8) | ((fillcolor[3] & 0xFF) << 0);
}

function intToColor(num) {
	var r = ((num & 0xFF000000) >>> 24), g = (num & 0xFF0000) >>> 16, b = (num & 0xFF00) >>> 8, a = num & 0xFF;
	return [r, g, b, a];
}

/**
 * 定义队列数据结构
 */
export function Queue() {
	this.dataStore = [];
}

Queue.prototype = {

	// 向队尾添加一个元素
	enqueue: function (element) {
		this.dataStore.push(element);
	},
	// 删除队首的元素
	dequeue: function () {
		return this.dataStore.shift();
	},
	// 读取队首的元素
	front: function () {
		return this.dataStore[0];
	},
	// 读取队尾的元素
	back: function () {
		return this.dataStore[this.dataStore.length - 1];
	},
	// 显示队列内的所有元素
	toString: function () {
		var retStr = "";
		for (var i = 0; i < this.dataStore.length; ++i) {
			retStr += this.dataStore[i] + "\n";
		}
		return retStr;
	},
	// 判断队列是否为空
	empty: function () {
		if (this.dataStore.length == 0) {
			return true;
		} else {
			return false;
		}
	}
};

// 截图
function dataURLToBlob(dataurl) {//ie 图片转格式
	var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
	  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	while (n--) {
	  u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], { type: mime })
  };
 export const downloadResult = (ele)=> {
	let canvasID = ele;
	let a = document.createElement('a');
	html2canvas(canvasID).then(canvas => {
	  let dom = document.body.appendChild(canvas);
	  dom.style.display = "none";
	  a.style.display = "none";
	  document.body.removeChild(dom);
	  let blob = dataURLToBlob(dom.toDataURL("image/png"));
	  a.setAttribute("href", URL.createObjectURL(blob));
	  a.setAttribute("download", "canvas.png")
	  document.body.appendChild(a);
	  a.click();
	  URL.revokeObjectURL(blob);
	  document.body.removeChild(a);
	});
  }
