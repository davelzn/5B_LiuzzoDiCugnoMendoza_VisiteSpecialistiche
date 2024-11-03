function render() {
  let formattedDate = [];
  let dayCounter = 0;

  for (let i = 0 ; dayCounter < 5 ; i++) {
    const futureDate = moment().add(i + currentWeekOffset * 7, 'days');
    const dayIndex = futureDate.day();

    // Considera solo i giorni lavorativi
    if (dayIndex !== 0 && dayIndex !== 6) {
      const dayName = giorniSettimana[dayIndex];
      formattedDate.push({
        date: futureDate.format('YYYY-MM-DD'),
        day: dayName,
      });
      dayCounter++;
    }
  }

  let html = renderTipologie();
  html += '<div class="mb-2">';
  html += `<button id="prevWeekButton" class="btn btn-light">Settimana Precedente</button>`;
  html += `<button id="nextWeekButton" class="btn btn-light">Settimana Successiva</button>`;
  html += '</div>';
  html += '<table class="table table-bordered"><thead><tr><th>Ora</th>';

  formattedDate.forEach(({ day, date }) => {
    html += `<th>${day} - ${date}</th>`;
  });
  html += '</tr></thead><tbody>';

  [8, 9, 10, 11, 12].forEach((ora) => {
    html += `<tr><td>${ora}</td>`;
    formattedDate.forEach(({ date }) => {
      const key = `${date} ${tipologieVisita[selectedTipologia]} ${ora}`;
      const disponibilita = diz[key] || 'Disponibile';
      html += `<td>${
        disponibilita === 'Disponibile' ? disponibilita : disponibilita
      }</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  tableContainer.innerHTML = html;

  document.getElementById('prevWeekButton').onclick = prevWeek;
  document.getElementById('nextWeekButton').onclick = nextWeek;
}