/**
 * Created by liyuze on 19/3/10.
 */
import { MockRequest, MockStatusError } from '@delon/mock';

const list = [];
const total = 35;

for (let i = 0; i < total; i += 1) {
  list.push({
    id: i + 1,
    name: '水轮机' + (i + 1) + '号',
    edst: i, // 额定水头？？（原界面写的是“净水头（m）”）
    edgl: i * 1.1, // 额定功率（kW)
    sljxl: i * 1.1, // 水轮机效率（%）
    fdjxl: i * 1.1, // 发电机效率（%）
    life: 10,
    factory: '水轮机制造' + (i + 1) + '厂',
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

  return { total: ret.length, list: ret.slice(start, ps * pi) };
}


export const TURBINE = {
  'GET /tinyNet/device/turbine/list': (req: MockRequest) => genData(req.queryString),
  'POST /tinyNet/device/turbine/select': (req: MockRequest) => list.find(w => w.id === +req.original.body.id),
  'POST /tinyNet/device/turbine/delete': (req: MockRequest) => {
    const temp = list.find(w => w.id === +req.original.body.id);
    temp.name = '电池40号';
    return temp;
  },
  'POST /tinyNet/device/turbine/update': (req: MockRequest) => {
    const temp = list.find(w => w.id === +req.original.body.battery.id);
    temp.name = req.original.body.battery.name;
    return temp;
  },
  'POST /tinyNet/device/turbine/add': (req: MockRequest) => {
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
