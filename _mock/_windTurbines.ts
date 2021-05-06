/**
 * Created by liyuze on 19/3/10.
 */
import { MockRequest, MockStatusError } from '@delon/mock';

const list = [];
const total = 35;

for (let i = 0; i < total; i += 1) {
  list.push({
    id: i + 1,
    name: '风轮机' + (i + 1) + '号',
    edgl: i, // 额定功率（kW）
    fjlggd: i * 1.1, // 风机轮毂高度（米）
    glqxnum: 20, // 功率曲线绘制点个数，默认为20
    life: 10,
    factory: '风轮机制造' + (i + 1) + '厂',
    type: i % 2,
    fs1: 7, // 风速（m/s）
    fs2: 7,
    fs3: 7,
    fs4: 7,
    fs5: 7,
    fs6: 7,
    fs7: 7,
    fs8: 7,
    fs9: 7,
    fs10: 7,
    fs11: 7,
    fs12: 7,
    fs13: 7,
    fs14: 7,
    fs15: 7,
    fs16: 7,
    fs17: 7,
    fs18: 7,
    fs19: 7,
    fs20: 7,
    gl1: 11,  // 功率（kW）
    gl2: 11,
    gl3: 11,
    gl4: 11,
    gl5: 11,
    gl6: 11,
    gl7: 11,
    gl8: 11,
    gl9: 11,
    gl10: 11,
    gl11: 11,
    gl12: 11,
    gl13: 11,
    gl14: 11,
    gl15: 11,
    gl16: 11,
    gl17: 11,
    gl18: 11,
    gl19: 11,
    gl20: 11,
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


export const WINDTURBINES = {
  'GET /tinyNet/device/wind_turbines/list': (req: MockRequest) => genData(req.queryString),
  'POST /tinyNet/device/wind_turbines/select': (req: MockRequest) => list.find(w => w.id === +req.original.body.id),
  'POST /tinyNet/device/wind_turbines/delete': (req: MockRequest) => {
    const temp = list.find(w => w.id === +req.original.body.id);
    temp.name = '电池40号';
    return temp;
  },
  'POST /tinyNet/device/wind_turbines/update': (req: MockRequest) => {
    const temp = list.find(w => w.id === +req.original.body.battery.id);
    temp.name = req.original.body.battery.name;
    return temp;
  },
  'POST /tinyNet/device/wind_turbines/add': (req: MockRequest) => {
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
