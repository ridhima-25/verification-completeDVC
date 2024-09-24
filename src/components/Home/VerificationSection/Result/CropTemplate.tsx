interface CropTemplateProps {
  value: any;
}

const CropTemplate: React.FC<CropTemplateProps> = ({ value }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="font-normal text-[11px] break-all">Farm ID</th>
            <th className="font-normal text-[11px] break-all">Crop Name</th>
            <th className="font-normal text-[11px] break-all">Season</th>
            <th className="font-normal text-[11px] break-all">Year</th>
            <th className="font-normal text-[11px] break-all">Sown Area</th>
            <th className="font-normal text-[11px] break-all">Sowing Date</th>
            <th className="font-normal text-[11px] break-all">
              Irrigation Type
            </th>
          </tr>
        </thead>

        <tbody>
          {value &&
            value.map((crop: any, index: number) => (
              <tr key={index}>
                <td className="font-normal text-[11px] break-all">
                  {crop.farmId}
                </td>
                <td className="font-normal text-[11px] break-all">
                  {crop.cropName}
                </td>
                <td className="font-normal text-[11px] break-all">
                  {crop.season}
                </td>
                <td className="font-normal text-[11px] break-all">
                  {crop.year}
                </td>
                <td className="font-normal text-[11px] break-all">
                  {crop.sownArea}
                </td>
                <td className="font-normal text-[11px] break-all">
                  {crop.sowingDate}
                </td>
                <td className="font-normal text-[11px] break-all">
                  {crop.irrigationType}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CropTemplate;
