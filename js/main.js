/// <reference path="../layui/types/index.d.ts" />

let porduct = [
  {
    checked: false, dataTag: '0', porducts: [
      {
        checked: false,
        price: 9000,
        num: 1,
        dataTag: '00'
      }
    ]
  },
  {
    checked: false, dataTag: '1', porducts: [
      {
        checked: false,
        price: 12000,
        num: 1,
        dataTag: '10'
      },
      {
        checked: false,
        price: 5000,
        num: 1,
        dataTag: '11'
      },
    ]
  },
  {
    checked: false, dataTag: '2', porducts: [
      {
        checked: false,
        price: 5380,
        num: 1,
        dataTag: '20'
      }
    ]
  },

]

let checkBoxs = document.getElementsByTagName("input");
let totalPrice = document.getElementsByClassName("total-price");

// 全选
function selectAll() {
  let selectAllCheckBox = document.getElementById("selectAll");
  let bool = selectAllCheckBox.checked

  for (let i = 0; i < checkBoxs.length; i++) {
    const elem = checkBoxs[i];
    if (i === checkBoxs.length - 1) {
      continue
    }
    elem.checked = bool
  }

  porduct.forEach(el => {
    el.checked = bool;
    el.porducts.forEach(elem => {
      elem.checked = bool
    });
  });
  renderTotalPrice()
}

function changeChecked(index, index_child) {
  let store = porduct[index] // 
  let porducts = porduct[index].porducts; // 所有商品
  if (index_child === undefined) {
    let bool = getDom(store.dataTag, 'input')[0].checked
    porducts.forEach(elem => {
      elem.checked = bool
      getDom(elem.dataTag, 'input')[0].checked = bool
    });
  } else {
    let _porduct = porduct[index].porducts[index_child];
    let bool = getDom(_porduct.dataTag, 'input')[0].checked
    _porduct.checked = bool

    // 判断全选
    let selectAlled = porducts.every(elem => (elem.checked === true));
    store.checked = selectAlled
    getDom(store.dataTag, 'input')[0].checked = selectAlled
  }
  renderTotalPrice()
}
// 修改数量
function changeNum(index, index_child, operator) {
  if (operator === '+') {
    porduct[index].porducts[index_child].num++
  }
  if (operator === '-') {
    if (porduct[index].porducts[index_child].num === 1) {
      return
    }
    porduct[index].porducts[index_child].num--
  }
  renderPorductNum();
  renderTotalPrice()
}

// 更新总计
function renderTotalPrice() {
  let totalPriceVal = 0;
  for (const item of porduct) {
    for (const item2 of item.porducts) {
      if (item2.checked) {
        totalPriceVal += item2.num * item2.price
      }
    }
  }
  totalPrice[0].innerHTML = `<span>￥${totalPriceVal}</span>`
}

// 更新数量
function renderPorductNum() {
  for (const item of porduct) {
    for (const item2 of item.porducts) {
      let span_num = getDom(item2.dataTag)
      if (span_num && span_num[0]) {
        span_num[0].innerHTML = item2.num
      }
    }
  }
}

function getDom(value, tagName = 'span', name = 'data-tag') {
  let selectDom = [];
  let dom = document.getElementsByTagName(tagName);
  for (let i = 0; i < dom.length; i++) {
    if (value === dom[i].getAttribute(name)) {
      selectDom.push(dom[i]);
    }
  }
  return selectDom;
}
; !function () {

}();