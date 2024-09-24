interface LandTemplateProps {
  value: any;
}
const LandTemplate: React.FC<LandTemplateProps> = ({ value }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="font-normal text-[11px] break-all">Farm ID</th>
            <th className="font-normal text-[11px] break-all">Survey Number</th>
            <th className="font-normal text-[11px] break-all">Village</th>
            <th className="font-normal text-[11px] break-all">District</th>
            <th className="font-normal text-[11px] break-all">Sub-District</th>
            <th className="font-normal text-[11px] break-all">Area</th>
            <th className="font-normal text-[11px] break-all">
              Land Use Classification
            </th>
          </tr>
        </thead>

        <tbody>
          {value &&
            value.map((land: any, index: number) => (
              <tr key={index}>
                <td className="font-normal text-[11px] break-all">
                  {land.farmId}
                </td>
                <td className="font-normal text-[11px] break-all">
                  {land.surveyNumber}
                </td>
                <td className="font-normal text-[11px] break-all">
                  {land.village}
                </td>
                <td className="font-normal text-[11px] break-all">
                  {land.district}
                </td>
                <td className="font-normal text-[11px] break-all">
                  {land.subDistrict}
                </td>
                <td className="font-normal text-[11px] break-all">
                  {land.area}
                </td>
                <td className="font-normal text-[11px] break-all">
                  {land.landUseClass}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default LandTemplate;
