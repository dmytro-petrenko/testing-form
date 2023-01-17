export default function formHandler(req, res) {
  const body = JSON.parse(req.body);
  console.log('Body from server: ', body);
  console.log('First name: ', body.firstName.length);

  if (
    body.firstName.length === 0 ||
    body.lastName.length === 0 ||
    body.dropdownItem.length === 0 ||
    body.calendarData === null
  ) {
    res.status(501).json(body);
  } else if (
    body.firstName.length > 0 &&
    body.lastName.length > 0 &&
    body.dropdownItem.length > 0 &&
    body.calendarData != null
  ) {
    res.status(200).json(body);
  } else {
    res.status(500).json(body);
  }
}
