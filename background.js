let shouldStopLoop = false;
document.addEventListener('DOMContentLoaded', function () {
  let excuteBtn = document.getElementById('excute');
  // onClick's logic below:
  excuteBtn.addEventListener('click', function () {
    shouldStopLoop = false;
    executeDelete();
  });
});

document.addEventListener('DOMContentLoaded', function () {
  let stopBtn = document.getElementById('stop');
  // onClick's logic below:
  stopBtn.addEventListener('click', function () {
    shouldStopLoop = true;
    return shouldStopLoop;
  });
});

function executeDelete() {
  const photoCount = document.getElementById('photoCount');

  function logMessage(message) {
    console.log(message);
  }

  function deleteLoop(i, count) {
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function deletePhoto() {
      await findAndClickMenuBtn();
      await sleep(1000);
      await findAndClickDeleteBtn();
      await sleep(1000);
      await findAndClickDeleteBtn();
    }

    setTimeout(function () {
      logMessage('開始刪除照片');
      deletePhoto();
      logMessage(`已刪除第 ${i + 1} 張照片`);
      logMessage(shouldStopLoop);

      deleteLoop(i + 1, count);
    }, i * 1000);

    if (shouldStopLoop) {
      logMessage('偵測按下stop，終止執行');
      return;
    }

    if (i >= count) {
      logMessage('已執行指定次數');
      return;
    }
  }

  deleteLoop(0, parseInt(photoCount.value) || 0);
}

async function findAndClickMenuBtn() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: clickMenuBtn
  });
}

async function findAndClickDeleteBtn() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: clickDeleteBtn
  });
}

function clickMenuBtn() {
  let menuBtn = document.querySelectorAll('[aria-label="更多動作"]');
  let nodes = Array.from(menuBtn);
  if (nodes.length > 0) {
    nodes[0].click();
  }
}

function clickDeleteBtn() {
  const deleteBtn = document.querySelectorAll('span');
  for (let i = 0; i < deleteBtn.length; i++) {
    if (deleteBtn[i].textContent.includes('永久刪除')) {
      // 找到匹配的元素
      deleteBtn[i].click();
    }
  }
}
