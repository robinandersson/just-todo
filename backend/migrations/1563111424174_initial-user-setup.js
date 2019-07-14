exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('users', {
    id: 'id',
    username: { type: 'varchar(255)', notNull: true },
    email: { type: 'varchar(255)', notNull: true },
    password: { type: 'varchar(255)', notNull: true },
    last_login: { type: 'timestamp with time zone' },
    joined_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = pgm => {
  pgm.dropTable('users');
};
