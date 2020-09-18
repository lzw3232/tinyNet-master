import { MockRequest, MockStatusError } from '@delon/mock';

const list = [];
const total = 35;

for (let i = 0; i < total; i += 1) {
  list.push({
    id: i + 1,
    name: '发电机' + (i + 1) + '号',
    edgl: i,  // 额定功率（kW）
    zdfzl: i * 1.1,  // 最低负载率（%）
    zxyysj: i * 1.1, // 最小运营时间（小时）
    co2: i * 1.1, // 二氧化碳（g/L）
    co: i * 1.1, // 一氧化碳（g/L）
    wrsdqhhw: (i + 1) * 100, // 未燃烧碳氢化合物（g/L）
    life: 10,
    klw: i * 1.1, // 颗粒物（g/L）
    so2: i, // 二氧化硫（g/L）
    dyhw: i, // 氮氧化物（g/L）
    glqxnum: 3, // 功率曲线的点的个数，默认3
    scgl1: i + 1, // 输出功率（kW）
    scgl2: i + 2,
    scgl3: i + 3,
    rlxh1: i + 1, // 燃料消耗（L/kW）
    rlxh2: i + 2,
    rlxh3: i + 3,
    factory: '电池制造' + (i + 1) + '厂',
    type: i % 2,
    capacity1: 0,
    capacity2: 1,
    capacity3: 100,
    capacity4: 10000,
    cjcb1: 0,
    cjcb2: 100 * (i + 1),
    cjcb3: 10000 * (i + 1),
    cjcb4: 1000000 * (i + 1),
    gxcb1: 0,
    gxcb2: 100 * 0.8 * (i + 1),
    gxcb3: 10000 * 0.8 * (i + 1),
    gxcb4: 1000000 * 0.8 * (i + 1),
    yxwhcb1: 0,
    yxwhcb2: 0,
    yxwhcb3: 0,
    yxwhcb4: 0,
    owner: '李哥',
  });
}

function genData(params: any) {
  let ret = [...list];
  const pi = +params.pi,
    ps = +params.ps,
    start = (pi - 1) * ps;

  if (params.name) {
    ret = ret.filter(data => data.name.indexOf(params.name) > -1);
  }

  ret.forEach(function (value) {
    if (value.type === 1) {
      value.type = '柴油';
    } else {
      value.type = '汽油';
    }
  });

  return { total: ret.length, list: ret.slice(start, ps * pi) };
}

export const GENERATOR = {
  'GET /tinyNet/device/generator/list': (req: MockRequest) => genData(req.queryString),
  'POST /tinyNet/device/generator/select': (req: MockRequest) => list.find(w => w.id === +req.original.body.id),
  'POST /tinyNet/device/generator/delete': (req: MockRequest) => {
    const temp = list.find(w => w.id === +req.original.body.id);
    temp.name = '电池40号';
    return temp;
  },
  'POST /tinyNet/device/generator/update': (req: MockRequest) => {
    const temp = list.find(w => w.id === +req.original.body.battery.id);
    temp.name = req.original.body.battery.name;
    return temp;
  },
  'POST /tinyNet/device/generator/add': (req: MockRequest) => {
    const temp = req.original.body.battery;
    temp['id'] = 40;
    const res = list.push(temp);
    return res;
  },
  // 发送 Status 错误
  '/404': () => {
    throw new MockStatusError(404);
  },
};
