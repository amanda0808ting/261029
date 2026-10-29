//宣告全域變數
let kickSprite;      // 儲存「踹人」精靈圖檔
let flyingKickSprite;// 儲存「飛踢」精靈圖檔

let kickFrames = 7;      // 「踹人」圖片總格數
let flyingKickFrames = 8;// 「飛踢」圖片總格數

let currentAction = "kick"; // 目前動作狀態："kick" (踹人) 或 "flyingKick" (飛踢)
let direction = 1;          // 移動方向：1 代表向右，-1 代表向左
let xPos, yPos;             // 角色目前的座標位置
let speed = 3;              // 角色移動速度

// 預先載入圖片資源
function preload() {
  // 載入踹人精靈圖（寬度 723，高度 88，共 7 張）
  kickSprite = loadImage("1/踹人/踹人.png");
  // 載入飛踢精靈圖（寬度 883，高度 87，共 8 張）
  flyingKickSprite = loadImage("1/飛踢/飛踢.png");
}

function setup() {
  // 建立一個佔滿整個視窗的全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  
  // 初始化角色位置在畫面正中央
  xPos = width / 2;
  yPos = height / 2;
}

function draw() {
  // 設定畫布背景顏色為 #ffc8dd (粉紅色)
  background("#ffc8dd");

  // 根據使用者的按鍵互動來更新角色狀態與位置
  handleInputAndMovement();

  // 繪製並播放當前的角色精靈動畫
  drawSpriteAnimation();
}

// 處理鍵盤輸入、狀態切換與移動邏輯
function handleInputAndMovement() {
  // 預設沒有按下左右鍵時，動作恢復為原本的「踹人」
  currentAction = "kick";

  // 當使用者按下鍵盤右鍵
  if (keyIsDown(RIGHT_ARROW)) {
    currentAction = "flyingKick"; // 切換為飛踢動作
    direction = 1;                // 設定面向右方
    xPos += speed;                // 角色座標向右移動
  }
  // 當使用者按下鍵盤左鍵
  else if (keyIsDown(LEFT_ARROW)) {
    currentAction = "flyingKick"; // 一樣顯示飛踢動作
    direction = -1;               // 設定面向左方
    xPos -= speed;                // 角色座標向左移動
  }

  // 限制角色不能超出畫布左右邊界
  xPos = constrain(xPos, 50, width - 50);
}

// 繪製角色精靈動畫的函式
function drawSpriteAnimation() {
  push(); // 儲存目前的畫布狀態
  
  // 將原點移動到角色中心位置，方便做左右轉向與置中
  translate(xPos, yPos);
  
  // 依據移動方向進行水平翻轉（達到角色轉向效果）
  scale(direction, 1);

  let frameWidth, frameHeight, totalFrames, spriteImage;

  // 判斷目前要顯示哪一種精靈圖與其對應參數
  if (currentAction === "kick") {
    spriteImage = kickSprite;
    totalFrames = kickFrames;
    frameWidth = 723 / kickFrames; // 計算單一格圖片的寬度
    frameHeight = 88;              // 圖片總高度
  } else {
    spriteImage = flyingKickSprite;
    totalFrames = flyingKickFrames;
    frameWidth = 883 / flyingKickFrames; // 計算單一格圖片的寬度
    frameHeight = 87;                    // 圖片總高度
  }

  // 利用影格率 (frameCount) 換算當前要顯示的動畫圖格索引 (達成循環播放)
  let currentFrame = floor(frameCount / 6) % totalFrames;
  
  // 計算該格在橫向圖片精靈中的起始 X 座標
  let sx = currentFrame * frameWidth;

  // 繪製圖片控制：從大圖中擷取指定小格，並繪製在畫布中心
  imageMode(CENTER);
  image(spriteImage, 0, 0, frameWidth * 2, frameHeight * 2, sx, 0, frameWidth, frameHeight);

  pop(); // 恢復原本的畫布狀態
}

// 當視窗大小改變時，自動調整畫布大小以維持全螢幕
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}