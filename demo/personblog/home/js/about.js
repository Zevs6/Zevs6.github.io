window.onload = function() {
	autoMove('lun', 'fang');
}

//轮播图函数
function autoMove(tagImg, tagSpan) {
	var imgs = document.getElementsByClassName(tagImg);
	var spans = document.getElementsByClassName(tagSpan);
	//每次轮播后样式
	/*轮播到哪个位置，就对哪个位置的图片样式进行设置，首先让所有的图片样式opacity变为0，然后对移动到的位置的样式进行设置opacity为1*/
	function InitMove(index) {
		for(var i = 0; i < imgs.length; i++) {
			imgs[i].style.opacity = '0';
			spans[i].style.background = '#ccc';
		}
		imgs[index].style.opacity = '1';
		spans[index].style.background = 'red';
	}
	//第一次初始化
	InitMove(0);
	//轮播过程的变换函数
	/*前面已经初始化了图片最开始看到的效果，接着轮播的话会隐藏第一张出现第二张
	 *这里count从1开始（图片的初始化位置是count为0的情况），count=1执行一次Init*Move(count),使第一张隐藏第二张出现，依次执行。当count==imgs.leghth时由于*图片最后一张的位置是imgs.length-1,所以此时把count置为0；相当于轮播图轮回
	 *依次重新开始。
	 */
	var count = 1;

	function fMove() {
		if(count == imgs.length) {
			count = 0;
		}
		InitMove(count);
		count++;
	}
	//设置自动轮播定时器；
	var scollMove = setInterval(fMove, 2000);

	//定义鼠标悬停事件
	main.onmouseover = function() {
		window.clearInterval(scollMove);
	}
	main.onmouseout = function() {
		window.clearInterval(scollMove);
		scollMove = window.setInterval(fMove, 2000);
	}

	//点击移动图片；
	/*这里就是点击左右移动的button来让图片根据用户的点击左右移动；需要注意一点就*是每次点击左移动或右移动需要首先清除定时器，
	 * 等移动完了在重新添加定时器不然的*话你点击移动后图片虽然该变了，但是由于定时器还没移动到这张图片上面，所以就需*要等待
	 * 定时器移动到你移动到的那张图片上面让后才开始定时轮播。比如如果你从开始
	 *就点击移动图片，一直移动到最后一张那么你就要等待两个定时器的时间才能看到自动*轮播。
	 */
	var btnleft = document.getElementById('left');
	var btnright = document.getElementById('right');
	btnleft.onclick = function() {
		clearInterval(scollMove);
		if(count == 0) {
			count = imgs.length;
		}
		count--;
		InitMove(count);
		scollMove = setInterval(fMove, 2000);
	};
	btnright.onclick = function() {
		clearInterval(scollMove);
		fMove();
		scollMove = setInterval(fMove, 2000);
	}

}