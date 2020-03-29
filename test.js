const main = () => {
  setTimeout(() => {
    console.log(2);
  }, 1000);

  console.log(1);
};

main();

// 上面代码输出是 1 2

// 需求让输出为 2 1

const sleep = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);

      resolve();
    }, 1000);
  });
};

const main = () => {
  sleep().then(() => {
    console.log(1);
  });
};

main();

// sleep().then  不喜欢 .then

const sleep = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);

      resolve(123);
    }, 1000);
  });
};

const main = async () => {
  // xxx 接受的其实是 resolve() 调用时传递进去的参数
  const xxx = await sleep();
  console.log(xxx);

  console.log(1);
};

main();
