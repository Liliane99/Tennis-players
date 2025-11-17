describe('Test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  it('should test', () => {
    const player = { firstname: 'Rafael', lastname: 'Nadal' };
    const fullname = `${player.firstname} ${player.lastname}`;
    expect(fullname).toBe('Rafael Nadal');
  });

  it('should test array operations', () => {
    const players = ['Nadal', 'Djokovic', 'Federer'];
    expect(players).toHaveLength(3);
    expect(players).toContain('Nadal');
  });
});
