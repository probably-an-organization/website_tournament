import { Card } from "@futshi/js_toolbox";

const DUMMY_DATA = {};

export default function TournamentTest() {
  return (
    <div>
      <div>TEST</div>
      <div className="flex flex-col gap-3 lg:flex-row max-w-5xl mx-auto">
        <Card className="p-3 flex-1">
          <div>Group A</div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>Participant</th>
                <th>Score</th>
                <th>Points (opt.)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">EG</td>
                <td className="text-center">0-1</td>
                <td className="text-center">0</td>
              </tr>
              <tr>
                <td className="text-center">EG</td>
                <td className="text-center">0-1</td>
                <td className="text-center">0</td>
              </tr>
              <tr>
                <td className="text-center">EG</td>
                <td className="text-center">0-1</td>
                <td className="text-center">0</td>
              </tr>
            </tbody>
          </table>
        </Card>
        <Card className="p-3 flex-1">
          <div>Group B</div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>Participant</th>
                <th>Score</th>
                <th>Points (opt.)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">EG</td>
                <td className="text-center">0-1</td>
                <td className="text-center">0</td>
              </tr>
              <tr>
                <td className="text-center">EG</td>
                <td className="text-center">0-1</td>
                <td className="text-center">0</td>
              </tr>
              <tr>
                <td className="text-center">EG</td>
                <td className="text-center">0-1</td>
                <td className="text-center">0</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
