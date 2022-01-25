const pool = require('../utils/pool.js');

module.exports = class Barbie {
  id;
  name;
  skinColor;
  hairColor;
  eyeColor;
  outfit;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.skinColor = row.skin_color;
    this.hairColor = row.hair_color;
    this.eyeColor = row.eye_color;
    this.outfit = row.outfit;
  }

  static async insert({ name, skinColor, hairColor, eyeColor, outfit }) {
    const { rows } = await pool.query(
      'INSERT INTO barbies (name, skin_color, hair_color, eye_color, outfit) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, skinColor, hairColor, eyeColor, outfit]
    );
    return new Barbie(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM barbies WHERE id=$1', [
      id,
    ]);

    if (!rows[0]) return null;
    return new Barbie(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM barbies');
    return rows.map((row) => new Barbie(row));
  }

  static async updateById(id, attributes) {
    const antiqueBarbie = await Barbie.getById(id);
    if (!antiqueBarbie) return null;
    //if you are sending an attribute, then use that. Otherwise, use the attributes that already exist in the row.
    const name = attributes.name ?? antiqueBarbie.name;
    const skinColor = attributes.skinColor ?? antiqueBarbie.skinColor;
    const hairColor = attributes.hairColor ?? antiqueBarbie.hairColor;
    const eyeColor = attributes.eyeColor ?? antiqueBarbie.eyeColor;
    const outfit = attributes.outfit ?? antiqueBarbie.outfit;

    const { rows } = await pool.query(
      'UPDATE barbies set name=$1, skin_color=$2, hair_color=$3, eye_color=$4, outfit=$5 WHERE id=$6 RETURNING *',
      [name, skinColor, hairColor, eyeColor, outfit, id]
    );
    return new Barbie(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM barbies WHERE id=$1 RETURNING *',
      [id]
    );

    if (!rows[0]) return null;

    return new Barbie(rows[0]);
  }
};
