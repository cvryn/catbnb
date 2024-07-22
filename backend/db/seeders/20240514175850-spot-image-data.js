'use strict';

const { SpotImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up (queryInterface, Sequelize) {

    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/c_crop,ar_1:1/v1717385330/catbnb/cat-box_q8k1et.jpg',
          preview: true,
        },
        {
          spotId: 1,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/c_crop,ar_1:1/v1717386107/catbnb/r-cat.box_g3hc5i.png',
          preview: true,
        },
        {
          spotId: 1,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717386107/catbnb/r-cat-box2_aerpqz.png',
          preview: true,
        },
        {
          spotId: 1,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721065909/catbnb/IMG_6144_ciaysb.jpg',
          preview: true,
        },
        {
          spotId: 1,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721065910/catbnb/IMG_6145_b0f0mp.jpg',
          preview: true,
        },
        {
          spotId: 2,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721078105/catbnb/8-2dY6rDmkIgt6eIx_yzgjy5.png',
          preview: true,
        },

        {
          spotId: 2,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721078127/catbnb/8-ZBR7bH81pQS93in_hgm535.png',
          preview: true,
        },
        {
          spotId: 2,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721078189/catbnb/8-FIEJTsUsgbnC404_mczqwa.png',
          preview: true,
        },
        {
          spotId: 2,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721078217/catbnb/8-4vNCUM2EFkfFJIC_n9ygwt.png',
          preview: true,
        },
        {
          spotId: 2,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721078243/catbnb/8-wKItdmXAtw1sQrg_m8f0th.png',
          preview: true,
        },
        {
          spotId: 3,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721075538/catbnb/8-H519OixpQdiceDX_qxact0.png',
          preview: true,
        },
        {
          spotId: 3,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721077665/catbnb/8-vmXLDyaZyS7Llb4_g45zgf.png',
          preview: true,
        },
        {
          spotId: 3,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721077729/catbnb/8-5J3aKlrK6lVOyvq_ixqisz.png',
          preview: true,
        },
        {
          spotId: 3,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721077754/catbnb/8-asgMXZGXbVKMqWs_yxoi0x.png',
          preview: true,
        },
        {
          spotId: 3,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721077784/catbnb/8-Rf8mm55wOSKOnkW_wu0zby.png',
          preview: true,
        },

        {
          spotId: 4,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721074400/catbnb/8-KiG2yqfWz0YXAC8_mr3ljz.png',
          preview: true,
        },
        {
          spotId: 4,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721074490/catbnb/8-AVtuapCccYDgLYh_piwzrs.png',
          preview: true,
        },
        {
          spotId: 4,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721074998/catbnb/8-A5Rq0cyObxt8IKw_azmbrr.png',
          preview: true,
        },
        {
          spotId: 4,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721074593/catbnb/8-DQ4wjfYwjaHW3dD_j4hq8n.png',
          preview: true,
        },
        {
          spotId: 4,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721074742/catbnb/8-1WiSWwzF2exEhou_nwlifm.png',
          preview: true,
        },
        {
          spotId: 5,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717385426/catbnb/cat-manor_ur2y73.png',
          preview: true,
        },
        {
          spotId: 5,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721074826/catbnb/8-uKE9E7uKGJhrzLj_u9ceyo.png',
          preview: true,
        },

        {
          spotId: 5,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721074524/catbnb/8-Zjtow5qpaH2IvWU_us7pk7.png',
          preview: true,
        },
        {
          spotId: 5,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721075071/catbnb/8-yg8MHE29sZH0k2X_lzeazw.png',
          preview: true,
        },
        {
          spotId: 5,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721074490/catbnb/8-AVtuapCccYDgLYh_piwzrs.png',
          preview: true,
        },
        {
          spotId: 6,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717481500/catbnb/8-48P9ONEPd4ZO7DE_zrqm0c.png',
          preview: true,
        },
        {
          spotId: 7,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717481451/catbnb/8-VHGdSOckSozju5k_q3y8ax.png',
          preview: true,
        },
        {
          spotId: 8,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717481289/catbnb/Cat%27s%20Corner.png',
          preview: true,
        },
        {
          spotId: 9,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717482655/catbnb/8-ATANKZhXomcJ7Tc_rqhse8.png',
          preview: true,
        },
        {
          spotId: 10,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717482636/catbnb/8-gw2n7QwDHxtKg4O_jhqf7r.png',
          preview: true,
        },
        {
          spotId: 11,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721075466/catbnb/8-OA1QO4YqbI3IWNv_slp1ry.png',
          preview: true,
        },
        {
          spotId: 12,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717481500/catbnb/8-48P9ONEPd4ZO7DE_zrqm0c.png',
          preview: true,
        },

        {
          spotId: 13,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721075250/catbnb/8-d2XU8On1wav9a7K_l0ifq7.png',
          preview: true,
        },
        {
          spotId: 14,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721075267/catbnb/8-x5ls0CLFUg406m4_h3kq7s.png',
          preview: true,
        },
        {
          spotId: 15,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721075276/catbnb/8-RcuZ8ApayWzqjrf_lqvyog.png',
          preview: true,
        },
        {
          spotId: 16,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721075300/catbnb/8-rNfv0CqhU6Foqgd_d5rumd.png',
          preview: true,
        },
        {
          spotId: 17,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721075444/catbnb/8-CQqVeeTfTWFirHo_x7s36z.png',
          preview: true,
        },
        {
          spotId: 18,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721075466/catbnb/8-OA1QO4YqbI3IWNv_slp1ry.png',
          preview: true,
        },
        {
          spotId: 19,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721075538/catbnb/8-H519OixpQdiceDX_qxact0.png',
          preview: true,
        },
        {
          spotId: 20,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1721075490/catbnb/8-z7OCXx5TFvGhERM_f3eqqx.png',
          preview: true,
        },

      ]
    )
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, null, {});
  }
};
