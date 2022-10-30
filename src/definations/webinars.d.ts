export type Room = {
  name: string;
  service_id: string;
  owner_ref: string;
  settings: {
    description: string;
    mode: string;
    scheduled: boolean;
    scheduled_time: Date;
    adhoc: boolean;
    duration: number;
    moderators: string;
    participants: string;
    auto_recording: boolean;
    active_talker: boolean;
    screen_share: boolean;
    canvas: boolean;
    knock: boolean;
    quality: string;
    billing_code: string;
    abwd: boolean;
    facex: boolean;
    max_active_talkers: number;
  };
  data: {
    custom_key: string;
  };
  configured_media_zone: string;
  created: Date;
  isMediaServerAvailable: boolean;
  updated: Date;
  room_id: string;
  sip: {
    enabled: boolean;
  };
};

export type Webinars = {
  result: number;
  rooms: Room[];
};
