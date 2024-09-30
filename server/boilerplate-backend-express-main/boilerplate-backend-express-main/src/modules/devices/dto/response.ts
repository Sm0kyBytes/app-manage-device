export type DeviceResponse = {
  deviceId: string;
  deviceName: string;
  description: string;
  category: string;
};

export type DeviceListResponse = {
  rows: DeviceResponse[];
  count: number;
};
