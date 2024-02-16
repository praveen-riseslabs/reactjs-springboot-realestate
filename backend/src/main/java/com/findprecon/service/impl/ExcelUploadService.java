package com.findprecon.service.impl;


import com.findprecon.model.ProjectData;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

@Service
public class ExcelUploadService {
    public static boolean isValidExcelFile(MultipartFile file) {
        return Objects.equals(file.getContentType(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }

    public static List<ProjectData> getCustomersDataFromExcel(InputStream inputStream) {
        List<ProjectData> projectDataArrayList = new ArrayList<>();
        try (XSSFWorkbook workbook = new XSSFWorkbook(inputStream)) {

            XSSFSheet sheet = workbook.getSheet("customers");
            if (sheet != null) {
                Iterator<Row> rowIterator = sheet.iterator();
                rowIterator.next(); // Skip header row
                while (rowIterator.hasNext()) {
                    Row row = rowIterator.next();

                    // Check if all cells in the row are empty
                    boolean isRowEmpty = true;
                    for (Cell cell : row) {
                        if (cell.getCellType() != CellType.BLANK) {
                            isRowEmpty = false;
                            break;
                        }
                    }

                    // Skip the row if it's empty
                    if (isRowEmpty) {
                        continue;
                    }

//                    Row row = rowIterator.next();
                    Iterator<Cell> cellIterator = row.cellIterator();
                    ProjectData projectData = new ProjectData();
                    while (cellIterator.hasNext()) {
                        Cell cell = cellIterator.next();
                        int cellIndex = cell.getColumnIndex();
                        switch (cellIndex) {
                            case 0:
                                projectData.setPropertyType(cell.getStringCellValue());
                                break;
                            case 1:
                                projectData.setPropertyArea(cell.getStringCellValue());
                                break;
                            case 2:
                                projectData.setDeveloper(cell.getStringCellValue());
                                break;
                            case 3:
                                projectData.setProjectName(cell.getStringCellValue());
                                break;
                            case 4:
                                projectData.setPropClosing(cell.getStringCellValue());
                                break;
                            case 5:
                                projectData.setPropClosingYear((int) cell.getNumericCellValue());
                                break;
                            case 6:
                                projectData.setStatusValididty(cell.getStringCellValue());
                                break;
                            case 7:
                                if (cell.getCellType() == CellType.NUMERIC) {
                                    projectData.setCommission((float) cell.getNumericCellValue());
                                } else if (cell.getCellType() == CellType.STRING) {
                                    // Handle string value with percentage sign
                                    String value = cell.getStringCellValue().replace("%", "");
                                    projectData.setCommission(Float.parseFloat(value) / 100);
                                }
                                break;
                            case 8:
                                projectData.setCommissionPayment(cell.getStringCellValue());
                                break;
                            case 9:
                                projectData.setDeveloperEmail(cell.getStringCellValue());
                                break;
                            case 10:
                                projectData.setSalesReprasentatives(cell.getStringCellValue());
                                break;
                            case 11:
                                projectData.setAddress(cell.getStringCellValue());
                                break;
                            case 12:
                                projectData.setSalesOfficeTelePhone(cell.getStringCellValue());
                                break;
                            case 13:
                                projectData.setModelName(cell.getStringCellValue());
                                break;
                            case 14:
                                projectData.setModelCost((long) cell.getNumericCellValue());
                                break;
                            case 15:
                                projectData.setModelSize((int) cell.getNumericCellValue());
                                break;
                            case 16:
                                projectData.setStory((int) cell.getNumericCellValue());
                                break;
                            case 17:
                                projectData.setForntLotSize((int) cell.getNumericCellValue());
                                break;
                            case 18:
                                projectData.setLotDepth((int) cell.getNumericCellValue());
                                break;
                            case 19:
                                projectData.setBedrooms((int) cell.getNumericCellValue());
                                break;
                            case 20:
                                projectData.setBathroomSize((float) cell.getNumericCellValue());
                                break;
                            case 21:
                                projectData.setGarage((int) cell.getNumericCellValue());
                                break;
                            case 22:
                                projectData.setBasement(cell.getStringCellValue());
                                break;
                            case 23:
                                projectData.setBasementType(cell.getStringCellValue());
                                break;
                            case 24:
                                projectData.setInculsion(cell.getStringCellValue());
                                break;
                            case 25:
                                projectData.setAddOn( cell.getStringCellValue());
                                break;
                            case 26:
                                projectData.setIntersection(cell.getStringCellValue());
                                break;
                            case 27:
                                projectData.setProjectPhase((int) cell.getNumericCellValue());
                                break;
                            case 28:
                                projectData.setTotalDeposit((int) cell.getNumericCellValue());
                                break;
                            case 29:
                                projectData.setDepositSubmission(cell.getStringCellValue());
                                break;
                            case 30:
                                projectData.setDevelopmentCharges((long) cell.getNumericCellValue());
                                break;
                            case 31:
                                projectData.setMaintananceFreeHold((int) cell.getNumericCellValue());
                                break;
                            case 32:
                                projectData.setMaintananceAmount(cell.getStringCellValue());
                                break;
                            case 33:
                                projectData.setDeveloperSpecial(cell.getStringCellValue());
                                break;
//                            case 34:
//                                customer.setDhreSpcialIncentive((long) cell.getNumericCellValue());
//                                break;
                            case 35:
                                projectData.setWebsiteLink(cell.getStringCellValue());
                                break;

                            default:
                                break;
                        }
                    }
                    projectDataArrayList.add(projectData);

                }
            } else {
                throw new IllegalArgumentException("Sheet 'customers' not found in the Excel file.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return projectDataArrayList;
    }
}
