interface Parent {
  key: string;
}

interface Child extends Parent {
  childKey: string;
}

const child: Child = {
  key: "key",
  childKey: "childKey",
};

const _parent = child as Parent;

console.log(_parent);
