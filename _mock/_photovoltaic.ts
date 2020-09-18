/**
 * Created by liyuze on 19/3/10.
 */
import { MockRequest, MockStatusError } from '@delon/mock';

const list = [];
const total = 35;

for (let i = 0; i < total; i += 1) {
  list.push({
    id: i + 1,
    name: '光伏' + (i + 1) + '号',
    edrl: 0,  // 额定容量？？实际上这个数据只有0
    tyntgl: i * 1.1, // 太阳能透过率（%
    jeys: i * 1.1, // 降噪因数
    gfzltynxsl: i * 1.1, // 光伏阵列的太阳能吸收率（%）
    gffdxl: i * 1.1, // 光伏发电效率（%）
    noctwd: (i + 1) * 100, // noct条件下的环境温度（℃）
    life: 10,
    wdxs: i * 1.1, // 温度系数（%/℃）
    noctgz: i,  // noct条件下的光照强度（kWh/m2/d），这两个变量，软件里写的是notc，数据库里边存的是noct
    gfbbzwd: i, // 光伏板标准温度（℃）
    stcwd: i, // stc条件下的PV电池温度（℃）
    dmfsl: i, // 地面反射率（%）
    fwj: i, // 方位角（°）
    qxj: i, // 倾斜角（°）
    factory: '光伏制造' + (i + 1) + '厂',
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
      value.type = '直流';
    } else {
      value.type = '交流';
    }
  });

  return { total: ret.length, list: ret.slice(start, ps * pi) };
}

export const PHOTOVOLTAIC = {
  'GET /tinyNet/device/photovoltaic/list': (req: MockRequest) => genData(req.queryString),
  'POST /tinyNet/device/photovoltaic/select': (req: MockRequest) => list.find(w => w.id === +req.original.body.id),
  'POST /tinyNet/device/photovoltaic/delete': (req: MockRequest) => {
    const temp = list.find(w => w.id === +req.original.body.id);
    temp.name = '电池40号';
    return temp;
  },
  'POST /tinyNet/device/photovoltaic/update': (req: MockRequest) => {
    const temp = list.find(w => w.id === +req.original.body.battery.id);
    temp.name = req.original.body.battery.name;
    return temp;
  },
  'POST /tinyNet/device/photovoltaic/add': (req: MockRequest) => {
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
