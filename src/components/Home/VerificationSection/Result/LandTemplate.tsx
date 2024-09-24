interface LandTemplateProps {
  value: any;
}
const LandTemplate: React.FC<LandTemplateProps> = ({ value }) => {
  return (
    <div>
      <table className="border border-gray-300">
        <thead>
          <tr>
            <th className="font-bold text-[11px] break-all border border-gray-300">
              Farm ID
            </th>
            <th className="font-bold text-[11px] break-all border border-gray-300">
              Survey Number
            </th>
            <th className="font-bold text-[11px] break-all border border-gray-300">
              Village
            </th>
            <th className="font-bold text-[11px] break-all border border-gray-300">
              District
            </th>
            <th className="font-bold text-[11px] break-all border border-gray-300">
              Sub-District
            </th>
            <th className="font-bold text-[11px] break-all border border-gray-300">
              Area
            </th>
            <th className="font-bold text-[11px] break-all border border-gray-300">
              Land Use Classification
            </th>
          </tr>
        </thead>

        <tbody>
          {value &&
            value.map((land: any, index: number) => (
              <tr key={index}>
                <td className="font-normal text-[11px] break-all border border-gray-300">
                  {land.farmId}
                </td>
                <td className="font-normal text-[11px] break-all border border-gray-300">
                  {land.surveyNumber}
                </td>
                <td className="font-normal text-[11px] break-all border border-gray-300">
                  {land.village}
                </td>
                <td className="font-normal text-[11px] break-all border border-gray-300">
                  {land.district}
                </td>
                <td className="font-normal text-[11px] break-all border border-gray-300">
                  {land.subDistrict}
                </td>
                <td className="font-normal text-[11px] break-all border border-gray-300">
                  {land.area}
                </td>
                <td className="font-normal text-[11px] break-all border border-gray-300">
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
