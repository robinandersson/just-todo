exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('todos', {
    id: { type: 'id', notNull: true },
    user_id: { type: 'id', notNull: true },
    description: { type: 'varchar(255)', notNull: true },
    is_completed: { type: 'boolean', notNull: true, default: false },
    completed_at: { type: 'timestamp with time zone' },
    created_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.addConstraint('todos', 'created_by_user_id', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users (id)',
    },
  });
};

exports.down = pgm => {
  pgm.dropTable('todos');
};
