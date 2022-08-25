export const getName = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const { results } = await response.json();
    return results[0].name.first;
}
