import { useEffect, useRef, useState } from "react";
import { RBTree } from "../../utils/data_structures/RedBlackTree";
let tree = new RBTree();
const Tree = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputState, setInputState] = useState("");
  const [isChar, setIsChar] = useState(false);

  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef]);

  let vGap = 40;
  let radius = 20;

  function draw() {
    let canvas: any = canvasRef.current;
    let context: any = canvas?.getContext("2d") as any; //.current.getContext("2d");

    // Reset size will clear the canvas, but not for IE9
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 180;
    context?.clearRect(0, 0, canvas.width, canvas.height); // For IE 9

    context.font = "14px sans-serif";
    context.strokeStyle = "#100"; // Set a pen color

    if (tree.isEmpty()) {
      context.fillText("tree is empty", canvas.width / 2 - 50, 15);
    } else {
      let x = canvas.width / 2;
      let y = 30;

      drawTree(context, x, y, radius, tree.root, canvas.width / 4);
    }

    context.stroke();
  }

  function drawTree(
    context: {
      fillStyle: string;
      beginPath: () => void;
      arc: (
        arg0: any,
        arg1: any,
        arg2: any,
        arg3: number,
        arg4: number,
        arg5: boolean
      ) => void;
      closePath: () => void;
      fill: () => void;
      fillText: (arg0: string, arg1: number, arg2: any) => void;
      moveTo: (arg0: any, arg1: any) => void;
    },
    x: number,
    y: number,
    radius: number,
    root: { isRed: () => any; element: number; left: null; right: null },
    hGap: number
  ) {
    if (root.isRed()) {
      context.fillStyle = "#EB0D1B";
    } else {
      context.fillStyle = "black";
    }

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();

    context.fillStyle = "white";

    if (!isChar) {
      if ((root.element + "").length === 1)
        context.fillText(root.element + "", x - 3, y + 5);
      else if ((root.element + "").length === 2)
        context.fillText(root.element + "", x - 8, y + 5);
      else if ((root.element + "").length === 3)
        context.fillText(root.element + "", x - 12, y + 5);
      else if ((root.element + "").length === 4)
        context.fillText(root.element + "", x - 16, y + 5);
      else context.fillText(root.element + "", x - 8, y + 5);
    } else {
      context.fillText(String.fromCharCode(root.element) + "", x - 4, y + 5);
    }

    if (root.left != null) {
      connectTwoCircles(context, x, y, x - hGap, y + vGap);
      context.moveTo(x - hGap + radius, y + vGap);
      drawTree(context, x - hGap, y + vGap, radius, root.left, hGap / 2);
    }

    if (root.right != null) {
      connectTwoCircles(context, x, y, x + hGap, y + vGap);
      context.moveTo(x + hGap + radius, y + vGap);
      drawTree(context, x + hGap, y + vGap, radius, root.right, hGap / 2);
    }
  }

  // Connect two circles centered at (x1, y1) and (x2, y2)
  function connectTwoCircles(
    context: {
      fillStyle: any;
      beginPath?: () => void;
      arc?: (
        arg0: any,
        arg1: any,
        arg2: any,
        arg3: number,
        arg4: number,
        arg5: boolean
      ) => void;
      closePath?: () => void;
      fill?: () => void;
      fillText?: (arg0: string, arg1: number, arg2: any) => void;
      moveTo: any;
      lineTo?: any;
      stroke?: any;
    },
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    context.fillStyle = "black";
    var d = Math.sqrt(vGap * vGap + (x2 - x1) * (x2 - x1));
    var x11 = x1 - (radius * (x1 - x2)) / d;
    var y11 = y1 - (radius * (y1 - y2)) / d;
    var x21 = x2 + (radius * (x1 - x2)) / d;
    var y21 = y2 + (radius * (y1 - y2)) / d;
    context.moveTo(x11, y11);
    context.lineTo(x21, y21);

    context.stroke();
  }

  // function remove1() {
  //   if (tree.isEmpty()) {
  //     jAlert("The tree is empty");
  //   } else {
  //     var value = document.getElementById("value").value.trim();
  //     if (value == "") {
  //       jAlert("no key entered");
  //     } else if (tree.search(parseInt(value))) {
  //       tree.delete(parseInt(value));
  //       draw();
  //     } else {
  //       jAlert("key " + value + " is not in the tree");
  //     }
  //   }
  // }

  // function removeAll() {
  //   tree.clear();
  //   draw();
  // }

  // function drawArrowLine(
  //   context: {
  //     moveTo: (arg0: any, arg1: any) => void;
  //     lineTo: (arg0: any, arg1: any) => void;
  //   },
  //   x1: number,
  //   y1: number,
  //   x2: number,
  //   y2: number
  // ) {
  //   context.moveTo(x1, y1);
  //   context.lineTo(x2, y2);

  //   // find slope of this line
  //   var slope = (y1 - y2) / (x1 - x2);

  //   var arctan = Math.atan(slope);

  //   // This will flip the arrow 45 off of a
  //   // perpendicular line at pt x2
  //   var set45 = 1.57 / 2;

  //   // arrows should always point towards i, not i+1
  //   if (x1 < x2) {
  //     // add 90 degrees to arrow lines
  //     set45 = -1.57 * 1.5;
  //   }

  //   // set length of arrows
  //   var arrlen = 15;

  //   // draw arrows on line
  //   context.moveTo(x2, y2);
  //   context.lineTo(
  //     x2 + Math.cos(arctan + set45) * arrlen,
  //     y2 + Math.sin(arctan + set45) * arrlen
  //   );

  //   context.moveTo(x2, y2);
  //   context.lineTo(
  //     x2 + Math.cos(arctan - set45) * arrlen,
  //     y2 + Math.sin(arctan - set45) * arrlen
  //   );
  // }

  // function search() {
  //   var value = document.getElementById("value").value.trim();
  //   if (value == "") {
  //     jAlert("no key entered");
  //   } else {
  //     if (tree.search(parseInt(value))) {
  //       jAlert(value + " is in the tree");
  //     } else {
  //       jAlert(value + " is not in the tree");
  //     }
  //   }
  // }

  function compare(a: any, b: any) {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }
    return 0;
  }

  function isVowel(char: string) {
    if (char.length === 1) {
      var vowels = ["a", "e", "i", "o", "u"];
      var isVowel = false;

      for (let e in vowels) {
        if (vowels[e] === char) {
          isVowel = true;
        }
      }

      return isVowel;
    }
  }

  function insert() {
    let t: Array<any> = [];
    let input: any = inputRef.current;
    var value = input.value.trim();
    if (!isChar) {
      if (value === "") {
        // jAlert("no key entered");
      } else if (tree.search(value)) {
        //jAlert("key " + value + " is already in the tree");
      } else {
        tree.insert(+value);
        console.log(tree.getInorder(tree.root, t));
        if (t.length > 1) {
          let sorted = t.sort(compare);
          let parent = tree.path(sorted[1].value);
          console.log(sorted[1], parent[parent.length - 2]);
        }
        draw();
      }
    } else {
      if (value === "") {
        // jAlert("no key entered");
      } else if (tree.search(value.charCodeAt())) {
        //jAlert("key " + value + " is already in the tree");
      } else {
        tree.insert(value.charCodeAt());
        console.log(tree.getInorder(tree.root, t));
        let sorted = t.filter((e) => !isVowel(String.fromCharCode(e.value)));
        sorted = sorted.map((e) => {
          return { value: String.fromCharCode(e.value), color: e.color };
        });
        console.log(sorted);
        sorted.forEach((e) =>
          console.log({...tree.searchNode(e.value.charCodeAt()), element: e.value})
        );
        draw();
      }
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          padding: "20px",
          gap: "5px",
          borderRadius: "5px",
        }}
      >
        <button
          type="button"
          style={{ width: "60px" }}
          onClick={() => insert()}
        >
          Insert
        </button>
        <input
          ref={inputRef}
          type="text"
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
        />
        <span>Char tree</span>
        <input type="checkbox" onChange={() => setIsChar(!isChar)} />
      </div>

      <div
        style={{
          border: "1px solid gray",
          textAlign: "right",
          backgroundColor: "gray",
          borderRadius: "20px",
        }}
      >
        <canvas ref={canvasRef} id="canvas" width="1000" height="500"></canvas>
      </div>
    </div>
  );
};

export default Tree;
