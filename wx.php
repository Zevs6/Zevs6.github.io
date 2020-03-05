<?php
	/**
	 * wechat php test
	*/

	header('Content-type:text');
	//define your token
	define("TOKEN", "zhangshuai");
	
	$wechatObj = new wechatCallbackapiTest();

	//判断微信官方是否发送请求
	if (!empty($_GET['echostr'])) {
		$wechatObj->valid();
	}else{
		$wechatObj->responseMsg();
	}
	
	
	class wechatCallbackapiTest
	{
		private $appID = "wxbf31c9c62fd921e2";
    	private $appSecret = "a6e44bbe1a645645baff4dffe9bf7949";

		//验证签名
		public function valid()
		{
			//接收随机字符串
			$echoStr = $_GET["echostr"];
			//接收微信加密签名
			$signature = $_GET["signature"];
			//接收时间戳
			$timestamp = $_GET["timestamp"];
			//接收随机数
			$nonce = $_GET["nonce"];
			//把TOKEN常量复制给$token变量
			$token = TOKEN;
			//把相关参数组装为数组（密钥、时间戳、随机数）
			$tmpArr = array($token, $timestamp, $nonce);
			//通过字典法进行排序
			sort($tmpArr, SORT_STRING);
			//将数组转化为字符串
			$tmpStr = implode($tmpArr);
			//通过哈希算法对字符串进行加密操作
			$tmpStr = sha1($tmpStr);
			//判断是否来源于微信 与加密签名进行对象
			if($tmpStr == $signature){
				//返回参数给微信并退出
				echo $echoStr;
				exit;
			}
		}


		//响应消息  自定义回复功能
		public function responseMsg()
		{
			//接收用户端发送过来的XML数据
			//get post data, May be due to the different environments
			$postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
			//判断XML数据是否为空			
			if (!empty($postStr)){
				/* libxml_disable_entity_loader is to prevent XML eXternal Entity Injection,
				the best way is to check the validity of xml by yourself */
				libxml_disable_entity_loader(true);
				//通过simplexml进行XML解析
				$postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
				//用户发送的类型
				$MsgType = trim($postObj->MsgType);
				//手机端用户
				$fromUsername = $postObj->FromUserName;
				//微信的公众平台
				$toUsername = $postObj->ToUserName;
				//接收用户发送的关键词
				$keyword = trim($postObj->Content);
				//时间戳
				$time = time();
				//接收用户发送的经纬度信息
				$latitude = $postObj->Location_X;
				$longitude = $postObj->Location_Y;
				//接收用户发送的图片链接
				$picurl = $postObj->PicUrl;
				//图片消息媒体id
				$mediaid = $postObj->MediaId;
				//文本发送模板
				$textTpl = "<xml>
							<ToUserName><![CDATA[%s]]></ToUserName>
							<FromUserName><![CDATA[%s]]></FromUserName>
							<CreateTime>%s</CreateTime>
							<MsgType><![CDATA[%s]]></MsgType>
							<Content><![CDATA[%s]]></Content>
							</xml>
							";  

				$imgageTpl = "<xml>
							  <ToUserName><![CDATA[%s]]></ToUserName>
							  <FromUserName><![CDATA[%s]]></FromUserName>
							  <CreateTime>%s</CreateTime>
							  <MsgType><![CDATA[%s]]></MsgType>
							  <Image>
							    <MediaId><![CDATA[%s]]></MediaId>
							  </Image>
							</xml>
							";  


				$voiveTpl = "<xml>
							  <ToUserName><![CDATA[%s]]></ToUserName>
							  <FromUserName><![CDATA[%s]]></FromUserName>
							  <CreateTime>%s</CreateTime>
							  <MsgType><![CDATA[%s]]></MsgType>
							  <Voice>
							    <MediaId><![CDATA[%s]]></MediaId>
							  </Voice>
							</xml>
							";  

				$videoTpl = "<xml>
							  <ToUserName><![CDATA[%s]]></ToUserName>
							  <FromUserName><![CDATA[%s]]></FromUserName>
							  <CreateTime>%s</CreateTime>
							  <MsgType><![CDATA[%s]]></MsgType>
							  <Video>
							    <MediaId><![CDATA[%s]]></MediaId>
							    <Title><![CDATA[%s]]></Title>
							    <Description><![CDATA[%s]]></Description>
							  </Video>
							</xml>
							";  

				$articlesTpl = "<xml>
							   <ToUserName><![CDATA[%s]]></ToUserName>
							   <FromUserName><![CDATA[%s]]></FromUserName>
							   <CreateTime>%s</CreateTime>
							   <MsgType><![CDATA[%s]]></MsgType>
							   <ArticleCount>%s</ArticleCount>
							   <Articles>%s</Articles>
							  </xml>
							 ";  

				$musicTpl = "<xml>
							  <ToUserName><![CDATA[%s]]></ToUserName>
							  <FromUserName><![CDATA[%s]]></FromUserName>
							  <CreateTime>%s</CreateTime>
							  <MsgType><![CDATA[%s]]></MsgType>
							  <Music>
							    <Title><![CDATA[%s]]></Title>
							    <Description><![%s]]></Description>
							    <MusicUrl><![CDATA[%s]]></MusicUrl>
							    <HQMusicUrl><![CDATA[%s]]></HQMusicUrl>
							  </Music>
							</xml>
							";

				if($MsgType=='text'){
					//判断用户发送的关键词是否为空           
					if(!empty( $keyword ))
					{
						switch (trim($keyword)) {
							case '你好':
								//设置回复类型，如果是text，代表文本类型
								$msgType = "text";
								//设置回复内容
								$contentStr = "你好，这里是皮皮家园官方公众号小帅搜！";
								//格式化字符串
								$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
								//把XML数据返回给用户
								echo $resultStr;
								break;
							case '?':
								//设置回复类型，如果是text，代表文本类型
								$msgType = "text";
								//设置回复内容
								$contentStr = "【1】特种服务号码\n【2】通讯服务号码\n【3】银行服务号码\n【4】返回主菜单\n您可以通过输入【】方括号内的编号获取相关内容哦！";
								//格式化字符串
								$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
								//把XML数据返回给用户
								echo $resultStr;
								break;
							case '1':
								//设置回复类型，如果是text，代表文本类型
								$msgType = "text";
								//设置回复内容
								$contentStr = "常用特种服务号码：\n匪警：110\n火警：119\n急救中心：120";
								//格式化字符串
								$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
								//把XML数据返回给用户
								echo $resultStr;
								break;
							case '2':
								//设置回复类型，如果是text，代表文本类型
								$msgType = "text";
								//设置回复内容
								$contentStr = "常用通讯服务号码：\n中国移动：10086\n中国电信：10000\n中国联通：10011";
								//格式化字符串
								$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
								//把XML数据返回给用户
								echo $resultStr;
								break;
							case '3':
								//设置回复类型，如果是text，代表文本类型
								$msgType = "text";
								//设置回复内容
								$contentStr = "常用银行服务号码：\n工商银行：95588\n中国建设：95533\n中国邮政：95580";
								//格式化字符串
								$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
								//把XML数据返回给用户
								echo $resultStr;
								break;
							case '点歌':
								//定义回复类型
								$msgType = 'music';
								//定义音乐标题
								$tile = "赤伶";
								//定义音乐描述
								$desc = '赤伶（Cover：苏合）';
								//定义音乐链接
								$url = 'http://zhangshuai.applinzi.com/weixin/赤伶.mp3';
								//定义高清音乐链接
								$hqurl = 'http://zhangshuai.applinzi.com/weixin/赤伶.mp3';
								//歌曲缩略图
								$thumbMediaId = 'https://cdn.jsdelivr.net/gh/Zevs6/blogimg3/img/1577163215702202.png';
								//格式化字符串
								$resultStr = sprintf($musicTpl, $fromUsername, $toUsername, $time, $msgType, $tile,$desc,$url,$hqurl);
								//返回XML数据到微信客户端
								echo $resultStr;
								break;
							case '图文':
								//定义回复类型
								$msgType = 'news';
								//设置返回图文的数量
								$count = 3;
								//设置要回复的图文数据
								$str = "";
								for ($i=1;$i<=$count;$i++){
									$str .= " <item>
										       <Title><![CDATA[武汉的自述火了：很抱歉以这种方式“出名”]]></Title>
										       <Description><![CDATA[当我们在家躲避疫情的时候，冲在第一线的是我们伟大的天使，义无反顾！让我们祝福他们，平安归来！]]></Description>
										       <PicUrl><![CDATA[https://mmbiz.qpic.cn/mmbiz_jpg/BuUZgtqiaurYNW1e7rPGicH7msJIRNrYlSE9e0VEpFberX5Aof35kTQ1jfRBEpcSIURicwRcGqz2dJ3f03tt9xvSQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1]]></PicUrl>
										       <Url><![CDATA[https://mp.weixin.qq.com/s?__biz=MzA4NzU0Mjk2NQ%3D%3D&mid=2247484081&idx=1&sn=4052edb5fe0f9de38b7121c413f53205&scene=45#wechat_redirect]]></Url>
										     </item>";
								}
								$resultStr = sprintf($articlesTpl, $fromUsername, $toUsername, $time, $msgType, $count,$str);
								//返回XML数据到微信客户端
								echo $resultStr;
								break;
							case '每日一言':
							    //定义回复类型
								$msgType = "text";
								//图片URL地址
								$contentStr = file_get_contents("https://api.gymxbl.com/?charset=utf-8");
								//格式化字符串
								$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
								//把XML数据返回给用户
								echo $resultStr;
								break;
							case '疫情信息':
								//定义回复类型
								$msgType = "text";
								//数据链接
								$url = "https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427";
								//模拟http中的get请求
								$str = file_get_contents($url);
								//转化json格式数据为数组或对象
								$json = json_decode($str);
								//获取各地区数据
								$list =$json->data->list;
								//累加各地区数据
								foreach ($list as $key => $value) {
									$contentStr .=$value->name."   确诊：".$value->value."  治愈：".$value->cureNum."   死亡：".$value->deathNum."\n";
								}
								//格式化字符串
								$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
								//把XML数据返回给用户
								echo $resultStr;
								break;
							case '疫情':
								//定义回复类型
								$msgType = "text";
								//数据链接
								$url = "https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427";
								//模拟http中的get请求
								$str = file_get_contents($url);
								//转化json格式数据为数组或对象
								$json = json_decode($str);
								//获取各地区数据
								$list =$json->data->list;
								//累加各地区数据
								$message = $json->data->times."\n全国累计确诊：".$json->data->gntotal."\n全国累计治愈：".$json->data->curetotal."\n全国累计死亡：".$json->data->deathtotal."\n全国现有确诊：".$json->data->econNum."\n全国现有疑似".$json->data->sustotal."\n全国现有重症：".$json->data->heconNum."\n武汉加油！中国加油！白衣天使们，你们辛苦了！";;
								//设置回复内容
								$contentStr = $message;
								//格式化字符串
								$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
								//把XML数据返回给用户
								echo $resultStr;
								break;
							default:
							//图灵机器人
								//设置回复类型，如果是text，代表文本类型
								$msgType = "text";
								//定义接口请求地址
								$url = "http://www.tuling123.com/openapi/api?key=9009fc44f168cfc7055c8a469821ce9b&info={$keyword}";
								//模拟http中的get请求
								$str = file_get_contents($url);
								//转化json格式数据为数组或对象
								$json = json_decode($str);
								//设置回复内容
								$contentStr = $json->text;
								//格式化字符串
								$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
								//把XML数据返回给用户
								echo $resultStr;
								break;
						}

					}else{
						echo "Input something...";
					}
				}

				if($MsgType=='image'){
					//回复类型，如果是text，代表文本类型
					$msgType = "text";
					//回复内容
					$contentStr = "您发送的是一个图片消息！\n图片链接为：{$picurl}";
					//格式化字符串
					$resultStr = sprintf($textTpl, $fromUsername, $toUsernam,$time, $msgType, $contentStr);
					//把XML数据返回给用户
					echo $resultStr;
					//回复用户发来的图片
					if(true){
						$msgType = "image";
						//格式化字符串
						$resultStr = sprintf($imgageTpl, $fromUsername, $toUsername, $time, $msgType, $mediaid);
						//把XML数据返回给用户
						echo $resultStr;	
					}
				}

				if($MsgType=='location'){
					//回复类型
					$msgType = "text";
					//定义接口请求地址
					$url = "http://api.map.baidu.com/cloudrgc/v1?location={$longitude},{$latitude}&geotable_id=144316&coord_type=gcj02ll&output=json&ak=EorWTl31RAC4Ejkk7gqOLZtD33GR8ofQ";
					//模拟http中的get请求
					$str = file_get_contents($url);
					//转化json格式数据为数组或对象
					$json = json_decode($str);
					//回复内容
					$contentStr = "您发送的是一个地理位置消息!\n您的位置：{$json->description}\n精度:{$longitude},纬度:{$latitude}";
					//格式化字符串
					$resultStr = sprintf($textTpl, $fromUsername, $toUsernam,$time, $msgType, $contentStr);
					//把XML数据返回给用户
					echo $resultStr;	
				}


			}else {
				echo "";
				exit;
			}

		}
	}

?>