package k.service.commodity;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import k.dao.DBO;
import k.dao.Upload;

/**
 * Servlet implementation class InsCom
 */
@WebServlet("/InsCom")
public class InsCom extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public InsCom() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		System.out.println("测试");

		String comname = request.getParameter("comname");
		String comprice = request.getParameter("comprice");
		String comimage = request.getParameter("comimage");
		String comtotal = request.getParameter("comtotal");
		String comsort = request.getParameter("comsort");
		String comdescribe = request.getParameter("comdescribe");
		// String merid = (String) request.getSession().getAttribute("id");
		String merid = "1";

		DBO db = new DBO();
		String sql = null;

		JSONObject upload_json = new JSONObject();
		PrintWriter out = response.getWriter();

		if (comimage != null)
			comimage = Upload.UploadImg(comimage);

		System.out.println(comimage);

		String[] params = new String[] { comname, comprice, comimage, comtotal,
				comsort, comdescribe, merid };

		int n = 0;// 判断是否插入成功;
		try {
			Connection conn = db.getConn();
			if (conn != null)
				System.out.println("conn sucess!");

			sql = new String(
					"INSERT INTO commodity (comname,comprice,comimage,comtotal,comsort,comdescribe,merid) values(?,?,?,?,?,?,?)");

			n = db.executeUpdate(sql, params);
			if (n == 0) {
				upload_json.put("status", false);
				upload_json.put("detail", "商品上架失败");
				System.out.println("商品上架失败!");
			} else {
				upload_json.put("status", true);
				upload_json.put("detail", "商品上架成功");
				System.out.println("商品上架成功!");
			}
			db.closeAll();

		} catch (ClassNotFoundException | InstantiationException
				| IllegalAccessException | SQLException | JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		out.print(upload_json.toString());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}

}
