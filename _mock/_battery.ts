import { MockRequest, MockStatusError } from '@delon/mock';

const list = [];
const total = 35;

for (let i = 0; i < total; i += 1) {
  list.push({
    id: i + 1,
    name: '电池' + (i + 1) + '号',
    eddy: i,
    xhcfdxl: i * 1.1,
    zdcdsl: i * 1.1,
    zdcddl: i * 1.1,
    zdfdsl: i * 1.1,
    dcrl: (i + 1) * 100,
    life: 10,
    qsmfd: i * 1.1,
    clgs: i,
    factory: '电池制造' + (i + 1) + '厂',
    type: i % 2,
    numberOrCapacity1: 0,
    numberOrCapacity2: 1,
    numberOrCapacity3: 100,
    numberOrCapacity4: 10000,
    capitalCurve1: 0,
    capitalCurve2: 100 * (i + 1),
    capitalCurve3: 10000 * (i + 1),
    capitalCurve4: 1000000 * (i + 1),
    replacementCost1: 0,
    replacementCost2: 100 * 0.8 * (i + 1),
    replacementCost3: 10000 * 0.8 * (i + 1),
    replacementCost4: 1000000 * 0.8 * (i + 1),
    maintainCost1: 0,
    maintainCost2: 0,
    maintainCost3: 0,
    maintainCost4: 0,
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
      value.type = '直流';
    } else {
      value.type = '交流';
    }
  });

  return { total: ret.length, list: ret.slice(start, ps * pi) };
}

function saveData(id: number, value: any) {
  const item = list.find(w => w.id === id);
  if (!item) {
    return { msg: '无效用户信息' };
  }
  Object.assign(item, value);
  return { msg: 'ok' };
}

export const BATTERYS = {
  'GET /tinyNet/device/battery/list': (req: MockRequest) => genData(req.queryString),
  'POST /tinyNet/device/battery/select': (req: MockRequest) => list.find(w => w.id === +req.original.body.id),
  'POST /tinyNet/device/battery/delete': (req: MockRequest) => {
    const temp = list.find(w => w.id === +req.original.body.id);
    temp.name = '电池40号';
    return temp;
  },
  'POST /tinyNet/device/battery/update': (req: MockRequest) => {
    const temp = list.find(w => w.id === +req.original.body.battery.id);
    temp.name = req.original.body.battery.name;
    return temp;
  },
  'POST /tinyNet/device/battery/add': (req: MockRequest) => {
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
