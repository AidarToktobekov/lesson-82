import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Artist from './models/Artist';
import Track from './models/Track';
import Album from './models/Album';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('albums');
    await db.dropCollection('artists');
    await db.dropCollection('tracks');

  } catch (e) {
    console.log('Skipping drop...');
  }

  const [scrip, eminem] = await Artist.create({
        name: 'Scriptonit',
    }, {
        name: 'Eminem',
    });

  const [scrip1 , scrip2, eminem1, eminem2] = await Album.create({
    name: 'Дом с нормальными явлениями',
    artist: scrip,
    date: new Date(),
  },{
    name: 'Скриптонит Уроборос: Улица 36',
    artist: scrip,
    date: new Date(),
  },{
    name: 'The Death of Slim Shady (Coup de Grâce)',
    artist: eminem,
    date: new Date(),
  },{
    name: 'The Marshall Mathers LP',
    artist: eminem,
    date: new Date(),
  });

  await Track.create({
    name: 'Мистер 718',
    duration: '3:12',
    trackNumber: 1,
    album: scrip1,
  },{
    name: 'Положение',
    duration: '3:32',
    trackNumber: 2,
    album: scrip1,
  },{
    name: 'Танцуй сама',
    duration: '3:02',
    trackNumber: 3,
    album: scrip1,
  },{
    name: 'Москва',
    duration: '4:12',
    trackNumber: 4,
    album: scrip1,
  },{
    name: '3x3',
    duration: '2:54',
    trackNumber: 5,
    album: scrip1,
  },{
    name: 'Мистер 718',
    duration: '3:12',
    trackNumber: 1,
    album: scrip2,
  },{
    name: 'Положение',
    duration: '3:32',
    trackNumber: 2,
    album: scrip2,
  },{
    name: 'Танцуй сама',
    duration: '3:02',
    trackNumber: 3,
    album: scrip2,
  },{
    name: 'Москва',
    duration: '4:12',
    trackNumber: 4,
    album: scrip2,
  },{
    name: '3x3',
    duration: '2:54',
    trackNumber: 5,
    album: scrip2,
  },{
    name: 'Superman',
    duration: '3:12',
    trackNumber: 1,
    album: eminem1,
  },{
    name: 'Without me',
    duration: '3:32',
    trackNumber: 2,
    album: eminem1,
  },{
    name: 'Venom',
    duration: '3:02',
    trackNumber: 3,
    album: eminem1,
  },{
    name: 'Yourself',
    duration: '4:12',
    trackNumber: 4,
    album: eminem1,
  },{
    name: 'stan',
    duration: '5:54',
    trackNumber: 5,
    album: eminem1,
  },{
    name: 'Superman',
    duration: '3:12',
    trackNumber: 1,
    album: eminem2,
  },{
    name: 'Without me',
    duration: '3:32',
    trackNumber: 2,
    album: eminem2,
  },{
    name: 'Venom',
    duration: '3:02',
    trackNumber: 3,
    album: eminem2,
  },{
    name: 'Yourself',
    duration: '4:12',
    trackNumber: 4,
    album: eminem2,
  },{
    name: 'stan',
    duration: '5:54',
    trackNumber: 5,
    album: eminem2,
  },)


  await db.close();
};

run().catch(console.error);